"use server";

import { MyResponse } from "@/type/type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = () => {
  const cookiesStore = cookies();
  cookiesStore.delete("token");
  redirect("/login");
};

export const handleAddWishlist = async (productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ productId }),
  });
  const responseJson: MyResponse<unknown> = await response.json();

  if (!response.ok) {
    if (responseJson.error === "Invalid credentials")
      redirect("/login?error=Please Login First");
    redirect(`/products?error=${responseJson.error}`);
  }
  revalidatePath("/wishlist");
  redirect("/products?success= Success Add to Cart");
};
