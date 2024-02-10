import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => bcrypt.hashSync(password);
export const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
