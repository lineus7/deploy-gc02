import { Product } from "@/type/type";
import { getClient } from "../config/mongo";

export const productCollection = async () => {
  const db = (await getClient()).db("GC-02").collection("products");
  return db;
};

export const getAllProduct = async (offset: number) => {
  const db = await productCollection();
  const products = (await db
    .find({})
    .limit(8)
    .skip(offset)
    .toArray()) as Product[];

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db = await productCollection();
  const product = (await db.findOne({ slug })) as Product;

  if (!product) throw new Error("Product Not Found");

  return product;
};

export const getProductBySearch = async (name: string) => {
  const db = await productCollection();
  const response = db.find({
    name: { $regex: new RegExp(name, "gi") },
  });
  const products = (await response.toArray()) as Product[];

  return products;
};
