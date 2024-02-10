"use server";

import { MyResponse } from "@/type/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (formData: FormData) => {
  const body: { email: string; password: string } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const responseJson: MyResponse<{ token: string }> = await response.json();

  if (!response.ok) {
    return redirect(`/login?error=${responseJson.error}`);
  }

  const { token } = responseJson.data as { token: string };
  cookies().set("token", token);

  return redirect("/");
};
