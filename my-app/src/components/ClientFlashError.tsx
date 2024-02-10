"use client";

import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export const ClientFlashParams = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const successMessage = searchParams.get("success");

  if (errorMessage) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });
  } else if (successMessage) {
    Swal.fire({
      title: successMessage,
      icon: "success",
    });
  }
  return <></>;
};
