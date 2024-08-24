import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { GenderByName } from "../../middleware/genderByName";
const saltRounds = 10;

const maleProfilePicture = "https://i.imgur.com/xm7WkuA.jpeg";
const femaleProfilePicture = "https://i.imgur.com/F9AjG02.jpeg";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const gender = await GenderByName(name);

    const selectedProfilePicture =
      gender === "male" ? maleProfilePicture : femaleProfilePicture;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePicture: selectedProfilePicture,
      },
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error: any) {
    if (
      error.code === "P2002" &&
      error.meta &&
      error.meta.target.includes("email")
    ) {
      return res.status(409).json({ message: "Email já está em uso" });
    }
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};
