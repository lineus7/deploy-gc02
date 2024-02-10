"use client";

import { Product } from "@/type/type";
import Link from "next/link";
import { MdStarBorder } from "react-icons/md";

const HomeProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <div className="">
        <Link href={`/products/${product.slug}`}>
          <div className=" h-[275px] flex justify-center">
            <img
              src={product.thumbnail}
              alt=""
              className="h-[275px] w-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col py-4">
            <p className="font-bold">{product.name}</p>
            <p className=" text-sm">{product.tags.join(`, `)}</p>
            <div className="mt-4 flex items-center">
              <div className="text-xs font-extrabold">Rp</div>
              <p className="font-extrabold">{product.price.toLocaleString()}</p>
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
      </div>
    </>
  );
};
export default HomeProductCard;
