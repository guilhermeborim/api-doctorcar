import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";
import { GenderByName } from "../middleware/genderByName";
import {
  UserChangePasswordProps,
  UserCreateProps,
  UserLoginProps,
} from "../types";
const saltRounds = 10;

const create = async (user: UserCreateProps) => {
  const maleProfilePicture = "https://i.imgur.com/xm7WkuA.jpeg";
  const femaleProfilePicture = "https://i.imgur.com/F9AjG02.jpeg";

  try {
    const gender = await GenderByName(user.name);
    const selectedProfilePicture =
      gender === "male" ? maleProfilePicture : femaleProfilePicture;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const rows = await pool.query(
      `INSERT INTO "user" ("name", "email","password","profilePicture","createdAt", "updatedAt")
          VALUES('${user.name}', '${user.email}','${hashedPassword}','${selectedProfilePicture}', NOW(), NOW())`,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const login = async (user: UserLoginProps) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM "user" WHERE email = '${user.email}'`,
    );

    if (rows.length === 0) {
      return response.status(400).json({ message: "Usuário não encontrado" });
    }

    const password = rows[0].password;
    const isMatch = await bcrypt.compare(user.password, password);

    if (!isMatch) {
      return response.status(400).json({ message: "Senha Inválida" });
    }
    const token = jwt.sign(
      { id: rows[0].id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    return token;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    response
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Usuário deslogado" });
  } catch (error: any) {
    console.error(error);
    response.status(500).json({ message: "Erro ao deslogar usuário" });
  }
};

const get = async (id: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM "user" WHERE id = '${id}'`,
    );
    return rows[0];
  } catch (error) {
    return error;
  }
};

const changePassword = async (user: UserChangePasswordProps) => {
  try {
    const rows = await pool.query(
      `UPDATE "user" SET password = '${user.newPassword}' WHERE email = '${user.email}' AND password = '${user.oldPassword}'`,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

export { changePassword, create, get, login, logout };
