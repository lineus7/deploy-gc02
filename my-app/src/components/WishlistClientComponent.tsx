"use client";

import WishlistCard from "@/components/WishlistCard";
import { MyResponse, Wishlist } from "@/type/type";
import { useEffect, useState } from "react";
import { ClientFlashParams } from "./ClientFlashError";

export const WishlistClientComponent = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist",
        {
          credentials: "include",
        }
      );
      const responseJson = (await response.json()) as MyResponse<unknown>;
      const wishlists = responseJson.data as Wishlist[];
      setWishlists(wishlists);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      fetchWishlists();
    }
  }, []);
  if (!process.env.NEXT_PUBLIC_API_URL) return <></>;
  return (
    <>
      <ClientFlashParams />
      <p className="text-3xl ml-[48px] font-semibold mt-12">Your Wishlist</p>
      {loading && (
        <div className="flex-1 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {wishlists.length <= 0 && !loading && (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-3xl text-gray-200 -mt-12">
            Start Add your Wishlist
          </p>
        </div>
      )}
      {wishlists.length > 0 && (
        <div className="mx-[48px] flex-1 mt-12 gap-6 grid grid-cols-4">
          {/* CARD */}
          {wishlists.map((wishlist) => {
            return (
              <WishlistCard
                wishlist={wishlist}
                key={wishlist._id as string}
                fetchWishlists={fetchWishlists}
              />
            );
          })}
          {/* END CARD */}
        </div>
      )}
    </>
  );
};
export default WishlistClientComponent;
