import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";
import { AppError } from "../errors/error";
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
    throw error;
  }
};

const login = async (user: UserLoginProps) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM "user" WHERE email = '${user.email}'`,
    );

    if (rows.length === 0) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const password = rows[0].password;
    const isMatch = await bcrypt.compare(user.password, password);

    if (!isMatch) {
      throw new AppError("Senha incorreta", 400);
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
    throw error;
  }
};

const get = async (id: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM "user" WHERE id = '${id}'`,
    );

    if (rows.length === 0) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const changePassword = async (user: UserChangePasswordProps) => {
  try {
    const password = await pool.query(
      `SELECT "password" FROM "user" WHERE email = '${user.email}'`,
    );

    const isMatch = await bcrypt.compare(
      user.oldPassword,
      password.rows[0].password,
    );

    if (!isMatch) {
      throw new AppError("Senha antiga incorreta", 400);
    }
    const hashedNewPassword = await bcrypt.hash(user.newPassword, saltRounds);
    const rows = await pool.query(
      `UPDATE "user" SET password = '${hashedNewPassword}' WHERE email = '${user.email}'`,
    );

    if (rows.rowCount === 0) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const checkEmailExist = async (email: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT "email" FROM "user" WHERE "email" = '${email}'`,
    );

    if (rows.length === 0) {
      return false;
    }
    return rows;
  } catch (error) {
    throw error;
  }
};
export { changePassword, checkEmailExist, create, get, login };
