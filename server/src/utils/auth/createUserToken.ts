import { User } from "@prisma/client";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default function createUserToken(user: User) {
  if (!process.env.JWT_SECRET) throw new Error("JWT missing");
  const token = { user: { id: user.id, login: user.login } };
  const userJson = JSON.stringify(token);
  const jwtToken = jwt.sign(userJson, process.env.JWT_SECRET);
  return jwtToken;
}
