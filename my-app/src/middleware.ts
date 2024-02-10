import { MyResponse } from "@/type/type";
import { getPayload } from "@/utils/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/wishlist")) {
    console.log("API", request.method, request.url);

    const token = cookies().get("token");

    if (!token)
      return NextResponse.json<MyResponse<unknown>>(
        {
          statusCode: 401,
          error: "Invalid credentials",
        },
        { status: 401 }
      );

    const tokenPayload = await getPayload<{
      _id: string;
      username: string;
      email: string;
    }>(token.value);

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", tokenPayload._id);
    requestHeaders.set("x-username", tokenPayload.username);
    requestHeaders.set("x-email", tokenPayload.email);

    return NextResponse.next({ headers: requestHeaders });
  }

  return NextResponse.next();
}
