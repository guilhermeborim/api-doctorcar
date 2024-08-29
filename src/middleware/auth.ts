import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ msg: "Acesso negado: Token expirado, faça o login novamente" });
//   }

//   try {
//     const { id, exp } = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: string;
//       exp: number;
//     };

//     // Verificar se o token está expirado
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (exp < currentTime) {
//       // Limpar o cookie se o token estiver expirado
//       res.clearCookie("token", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });

//       return res.status(401).json({ msg: "Token expirado" });
//     }

//     req.tokenData = { id, exp };
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token não é válido" });
//   }
// };

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
