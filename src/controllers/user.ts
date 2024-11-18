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

    const userExist = await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExist) {
      return { status: 400, message: "Email já está em uso", data: null };
    }

    const newUser = await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        profile_picture: selectedProfilePicture,
      },
    });

    return { status: 200, message: "Conta criada com sucesso", data: newUser };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const login = async (user: UserLoginProps) => {
  try {
    const foundUser = await prismaClient.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) {
      return { status: 400, message: "Usuário não encontrado", data: null };
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      return { status: 400, message: "Senha inválida", data: null };
    }

    const token = jwt.sign(
      { id: foundUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return { status: 200, message: "Login bem-sucedido", data: token };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
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
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const returnById = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    return { status: 200, message: "Usuário buscado com sucesso", data: user };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const changePassword = async (user: UserChangePasswordProps) => {
  try {
    const hashedPassword = await bcrypt.hash(user.new_password, saltRounds);

    const userExist = await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExist) {
      return { status: 400, message: "Usuário nao encontrado", data: null };
    }

    const updatedUser = await prismaClient.user.updateMany({
      where: {
        email: user.email,
        password: user.old_password,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      status: 200,
      message: "Senha modificada com sucesso",
      updatedUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export { changePassword, create, returnById, login, logout };
