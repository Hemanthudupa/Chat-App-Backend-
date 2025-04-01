import { hash, compare } from "bcrypt";
export async function hashPassword(password: string) {
  let salt = 10;
  return await hash(password, salt);
}
