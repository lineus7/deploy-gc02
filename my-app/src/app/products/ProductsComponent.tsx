"use client";

import { ClientFlashParams } from "@/components/ClientFlashError";
import ProductCard from "@/components/ProductCard";
import { MyResponse, Product } from "@/type/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductsComponent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchSearchProducts = async (input: string) => {
    try {
      setLoading(true);
      await new Promise((r) => {
        setTimeout(r, 700);
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search/${input}`
      );
      const responseJson = (await response.json()) as MyResponse<Product>;
      const products = responseJson.data as Product[];
      setProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProducts = async (offset: number) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ length: offset }),
        }
      );

      const responseJson = (await response.json()) as MyResponse<Product>;

      const dataProduct = responseJson.data as Product[];
      const concatProduct = products.concat(dataProduct);

      if (dataProduct.length < 8) setHasMore(false);
      setProducts(concatProduct);
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      if (!search) {
        fetchProducts(0);
      } else {
        fetchSearchProducts(search);
      }
    }
  }, [search]);

  if (!process.env.NEXT_PUBLIC_API_URL) return <></>;

  return (
    <>
      <ClientFlashParams />
      <p className="text-3xl ml-[48px] font-semibold mt-12">Produk</p>
      {products.length === 0 && !loading && (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-3xl text-gray-200 -mt-12">Product Not Found</p>
        </div>
      )}
      {loading && (
        <div className="flex-1 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {products.length > 0 && !search && (
        <>
          {/* CARD */}
          <InfiniteScroll
            dataLength={products.length}
            next={() => {
              fetchProducts(products.length);
            }}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center h-[50px] mt-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            <div className="mx-[48px] flex-1 mt-12 gap-6 grid grid-cols-4">
              {products.map((product, index) => {
                return <ProductCard product={product} key={index} />;
              })}
            </div>
          </InfiniteScroll>
          {/* END CARD */}
        </>
      )}
      {products.length > 0 && search && !loading && (
        <>
          {/* CARD */}
          <div className="mx-[48px] flex-1 mt-12 gap-6 grid grid-cols-4">
            {products.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </div>
          {/* END CARD */}
        </>
      )}
    </>
  );
};
export default ProductsComponent;
