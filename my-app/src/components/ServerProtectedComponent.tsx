"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ServerProtected = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = cookies().get("token");
  if (!token?.value) redirect("/login");

  return <>{children}</>;
};

export const LoginProtection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = cookies().get("token");

  if (token?.value) redirect("/");

  return <>{children}</>;
};
