import { deleteWishlistByProductId } from "@/db/models/wishlist";
import { MyResponse } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const userId = request.headers.get("x-user-id") as string;

    if (!userId || !params.productId) throw new Error("Missing required ID");
    const response = await deleteWishlistByProductId(params.productId, userId);
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: response,
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
};
