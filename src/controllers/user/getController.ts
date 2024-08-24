import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.tokenData.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
    })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}