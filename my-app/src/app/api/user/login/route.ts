import { loginUser } from "@/db/models/user";
import { MyResponse } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const res: { email: string; password: string } = await request.json();

    const parsedData = loginSchema.safeParse(res);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    const token = await loginUser(res);

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: "Success Login User",
      data: { token },
    });
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
