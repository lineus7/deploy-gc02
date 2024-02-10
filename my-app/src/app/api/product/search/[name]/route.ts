import { getProductBySearch } from "@/db/models/product";
import { MyResponse } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const GET = async (
  _request: Request,
  { params }: { params: { name: string } }
) => {
  try {
    const data = await getProductBySearch(params.name);

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: `Success Read Product ${params.name}`,
      data,
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
};
