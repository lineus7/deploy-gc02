import { ObjectId } from "mongodb";
import { getClient } from "../config/mongo";
import { productCollection } from "./product";
import { Wishlist } from "@/type/type";

const wishlistCollection = async () => {
  const db = (await getClient()).db("GC-02").collection("wishlists");
  return db;
};

export const addWishlist = async (userId: string, productId: string) => {
  const body = {
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const foundProduct = (await productCollection()).findOne({
    _id: new ObjectId(productId),
  });
  if (!foundProduct) throw new Error("Product Not Found");

  const response = await (await wishlistCollection()).insertOne(body);
  const foundWishlist = (await (
    await wishlistCollection()
  ).findOne({
    _id: response.insertedId,
  })) as Wishlist;

  return foundWishlist;
};

export const getWishlistByUserId = async (userId: string) => {
  const response = (await wishlistCollection()).aggregate([
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  const wishlists = (await response.toArray()) as Wishlist[];

  return wishlists;
};

export const deleteWishlistByProductId = async (
  productId: string,
  userId: string
) => {
  const wishlistFound = (await (await wishlistCollection())
    .find({ _id: new ObjectId(productId) })
    .toArray()) as Wishlist[];

  if (!wishlistFound) throw new Error("Wishlist not found");

  await (
    await wishlistCollection()
  ).deleteOne({
    _id: new ObjectId(productId),
  });

  return `Success Delete Product ID : ${productId}`;
};
