import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
export async function hashPassword(password: string) {
  let salt = 10;
  return await hash(String(password), salt);
}
export async function comparePassword(password: any, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function generateToken(data: any) {
  try {
    const token = sign(data, process.env.JWT_SECRET as any, {
      expiresIn: process.env.JWT_EXPIRES_IN as any,
    });
    return token;
  } catch (error) {
    throw new Error("Error generating token: " + (error as Error).message);
  }
}
