import { getProductBySlug } from "@/db/models/product";
import { MyResponse } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await getProductBySlug(params.slug);

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: `Success Read Product ${params.slug}`,
      data,
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
