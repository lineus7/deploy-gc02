"use client";

import { handleAddWishlist } from "./action/action";

export default ({ productId }: { productId: string }) => {
  return (
    <button
      className="w-full bg-blue-400 h-[40px] text-white hover:bg-blue-700 rounded-full my-8"
      onClick={() => handleAddWishlist(productId)}
    >
      Add to Cart
    </button>
  );
};
