import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Executando SQL puro
    const users = await AppDataSource.query("SELECT * FROM user");

    return res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    // Executando SQL puro
    const user = await AppDataSource.query(
      "INSERT INTO `user` (`name`) VALUES (?)",
      [name],
    );

    return res.json({
      status: "success",
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};
