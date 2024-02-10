import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);
const alg = "HS256";

export const createToken = async (payload: {
  _id: string;
  username: string;
  email: string;
}) => await new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(secret);

export const getPayload = async <T>(token: string) => {
  const tokenPayload = await jose.jwtVerify<T>(token, secret);
  return tokenPayload.payload;
};
