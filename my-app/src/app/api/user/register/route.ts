import { registerUser } from "@/db/models/user";
import { MyResponse, RegisUser } from "@/type/type";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import { z } from "zod";

const regisSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const res: RegisUser = await request.json();

    const parsedData = regisSchema.safeParse(res);
    if (!parsedData.success) {
      throw parsedData.error;
    }

    await registerUser(res);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success Create User",
        data: res,
      },
      { status: 201 }
    );
  } catch (error) {
    const err = errorHandler(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
