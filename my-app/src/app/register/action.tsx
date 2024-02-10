"use server";
import { MyResponse, User } from "@/type/type";
import { redirect } from "next/navigation";

export const handleRegister = async (formData: FormData) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/user/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        username: formData.get("username"),
        name: formData.get("name"),
        password: formData.get("password"),
      }),
    }
  );

  const responseJson = (await response.json()) as MyResponse<User>;
  if (!response.ok) {
    return redirect(`/register?error=${responseJson.error}`);
  }

  return redirect("/login?success=Success Register");
};
