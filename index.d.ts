import { Request } from "express";

interface tokenData {
  id: string;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      tokenData: tokenData;
    }
  }
}
