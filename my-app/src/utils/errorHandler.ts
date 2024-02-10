import { z } from "zod";

export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message, "<<<<<<<<<<< INI ERROR");

    if (error.message === "User Not Found") {
      return {
        statusCode: 404,
        error: error.message,
      };
    }

    if (error.message === "Product Not Found") {
      return {
        statusCode: 404,
        error: error.message,
      };
    }

    if (error.message === "Wishlist not found") {
      return {
        statusCode: 404,
        error: error.message,
      };
    }

    if (error.message === "Forbidden") {
      return {
        statusCode: 403,
        error: error.message,
      };
    }

    if (error.message === "Missing required ID") {
      return {
        statusCode: 400,
        error: error.message,
      };
    }

    if (error.message === "Email already registered") {
      return {
        statusCode: 400,
        error: error.message,
      };
    }

    if (error.message === "Username already registered") {
      return {
        statusCode: 400,
        error: error.message,
      };
    }

    if (error.message === "invalid credentials") {
      return {
        statusCode: 400,
        error: "Invalid email/password",
      };
    }
  }

  if (error instanceof z.ZodError) {
    const errMessage = error.issues[0].message;
    if (errMessage === "String must contain at least 5 character(s)") {
      return {
        statusCode: 400,
        error: "Password must contain at least 5 character(s)",
      };
    }
    return {
      statusCode: 400,
      error: errMessage,
    };
  }

  return {
    statusCode: 500,
    message: "Internal server error",
  };
};
