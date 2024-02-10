import { comparePassword, hashPassword } from "@/utils/hash";
import { getClient } from "../config/mongo";
import { LoginUser, RegisUser, User } from "@/type/type";
import { createToken } from "@/utils/token";

const userCollection = async () => {
  const db = (await getClient()).db("GC-02").collection("users");
  return db;
};

export const registerUser = async (form: RegisUser) => {
  const db = await userCollection();

  let foundUser = await db.findOne({ email: form.email });
  if (foundUser) throw new Error("Email already registered");

  foundUser = await db.findOne({ username: form.username });
  if (foundUser) throw new Error("Username already registered");

  const body = {
    ...form,
    password: hashPassword(form.password),
  };
  const user = await db.insertOne(body);
  const newUser = (await db.findOne(
    { _id: user.insertedId },
    { projection: { password: 0 } }
  )) as User;

  return newUser;
};

export const loginUser = async (form: LoginUser) => {
  const db = await userCollection();

  const foundUser = (await db.findOne({ email: form.email })) as User;
  if (
    !foundUser ||
    !comparePassword(form.password, foundUser.password as string)
  ) {
    throw new Error("invalid credentials");
  }

  const token = await createToken({
    _id: foundUser._id as string,
    username: foundUser.username,
    email: foundUser.email,
  });

  return token;
};

// export const getUserById = async (id: string) => {
//   const data = (await userCollection()).findOne({
//     _id: new ObjectId(id),
//   }) as Promise<User>;

//   if (!data) throw new Error("User Not Found");

//   return data;
// };
