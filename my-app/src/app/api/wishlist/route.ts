import { addWishlist, getWishlistByUserId } from "@/db/models/wishlist";
import { MyResponse, WishlistInput } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const wishlistSchema = z.object({
  productId: z.string(),
});

export const POST = async (request: NextRequest) => {
  try {
    const { productId } = (await request.json()) as WishlistInput;
    const userId = request.headers.get("x-user-id") as string;

    if (!userId || !productId) throw new Error("Missing required ID");

    const parsedData = wishlistSchema.safeParse({ productId });
    if (!parsedData.success) {
      throw parsedData.error;
    }

    const result = await addWishlist(userId, productId);
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success Add Wishlist",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get("x-user-id") as string;

    const result = await getWishlistByUserId(userId);
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: "Success Read Wishlist",
      data: result,
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
};
