import { getAllProduct } from "@/db/models/product";
import { MyResponse } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

// BUAT HALAMAN PRODUCTS YANG INFINITE SCROLL
export async function POST(request: Request) {
  try {
    const body: { length: number } = await request.json();

    const data = await getAllProduct(body.length);

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: "Success Read All Product",
      data: data,
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
