import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../prisma";
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

    const newUser = await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        profile_picture: selectedProfilePicture,
      },
    });

    return newUser;
  } catch (error) {
    return error;
  }
};

const login = async (user: UserLoginProps) => {
  try {
    const foundUser = await prismaClient.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) {
      return response.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Senha Inválida" });
    }

    const token = jwt.sign(
      { id: foundUser.id },
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
    return error;
  }
};

const returnById = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return error;
  }
};

const changePassword = async (user: UserChangePasswordProps) => {
  try {
    const hashedPassword = await bcrypt.hash(user.new_password, saltRounds);

    const updatedUser = await prismaClient.user.updateMany({
      where: {
        email: user.email,
        password: user.old_password,
      },
      data: {
        password: hashedPassword,
      },
    });

    return updatedUser;
  } catch (error) {
    return error;
  }
};

export { changePassword, create, returnById, login, logout };
