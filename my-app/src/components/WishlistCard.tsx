"use client";

import { MyResponse, Wishlist } from "@/type/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdStarBorder } from "react-icons/md";

const WishlistCard = ({
  wishlist,
  fetchWishlists,
}: {
  wishlist: Wishlist;
  fetchWishlists: () => void;
}) => {
  const router = useRouter();
  if (!process.env.NEXT_PUBLIC_API_URL) return <></>;
  const handleDelete = async (productId: string) => {
    console.log("ini handle delete");
    console.log(productId, "<<< ini masih di handle delete");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${productId}`,
      { method: "DELETE", credentials: "include" }
    );
    const responseJson: MyResponse<unknown> = await response.json();
    console.log(responseJson);

    if (!response.ok) {
      router.replace(`/wishlist?error=${responseJson.error}`);
    }
    fetchWishlists();
  };

  return (
    <>
      <div className="">
        <Link href={"/products/detail"}>
          <div className=" h-[275px] flex justify-center">
            <img
              src={wishlist.product?.thumbnail}
              alt=""
              className="h-[275px] w-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col py-4">
            <p className="font-bold">{wishlist.product?.name}</p>
            <p className=" text-sm">{wishlist.product?.tags.join(`, `)}</p>
            <div className="mt-4 flex items-center">
              <div className="text-xs font-extrabold">Rp</div>
              <p className="font-extrabold">
                {wishlist.product?.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <MdStarBorder />
              <MdStarBorder />
              <MdStarBorder />
              <MdStarBorder />
              <MdStarBorder />
              <span className="text-xs">0(0)</span>
            </div>
          </div>
        </Link>
        <button
          className="text-center w-full bg-slate-200 hover:bg-slate-400"
          onClick={() => {
            handleDelete(wishlist._id as string);
          }}
        >
          Remove from Cart
        </button>
      </div>
    </>
  );
};
export default WishlistCard;
