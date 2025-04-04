import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { APIError } from "./CustomError";
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

export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as any);
    return decoded;
  } catch (error) {
    throw new Error(
      "Error verifying token - token is expired or invalid : " +
        (error as Error).message
    );
  }
}

export async function ensureUser(req: any, res: any, next: any) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      console.log("error ");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
