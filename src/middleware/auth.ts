import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const auth = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.json({ message: "Invalid JWT token " });
  }

  const [, token] = authHeader ? authHeader.split(" ") : [, ""];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { exp, id } = decoded as { exp: number; id: string };

    request.tokenData = {
      id: id,
      exp: exp,
    };

    return next();
  } catch (error) {
    console.log(error);
    response.json({ message: "Invalid JWT token" });
  }
};

export default auth;
