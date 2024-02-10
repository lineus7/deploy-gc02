import { ObjectId } from "mongodb";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T | T[];
  error?: string;
};

export type User = {
  _id: ObjectId | string;
  name: string;
  username: string;
  email: string;
  password?: string;
};

export type Product = {
  _id: ObjectId | string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  _id: ObjectId | string;
  userId: ObjectId | string;
  productId: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
};

export type RegisUser = {
  name: string;
  username: string;
  password: string;
  email: string;
};

export type LoginUser = {
  password: string;
  email: string;
};

export type WishlistInput = { productId: string };
