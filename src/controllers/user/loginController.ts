import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../../prisma";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email ou Senha inválidos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha Inválida" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.json({ token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
