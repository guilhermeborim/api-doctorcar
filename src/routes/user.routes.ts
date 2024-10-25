import { Router } from "express";
import UserCtrl from "../controllers/user";
import { AppError } from "../errors/error";
import auth from "../middleware/auth";
import { validateData } from "../middleware/validate";
import {
  changePasswordSchema,
  createUserSchema,
  loginUserSchema,
} from "../utils/index";
export const userRouter = Router();

userRouter.post(
  "/register",
  validateData(createUserSchema),
  async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const register = { name, email, password };

      const emailExist = await UserCtrl.checkEmailExist(email);

      if (emailExist) {
        throw new AppError("Este email já está cadastrado", 400);
      }

      const registerSaved = await UserCtrl.create(register);

      if (registerSaved) {
        return response.json({ status: 200, data: register });
      }
      return response.json({
        status: "error",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ status: "failed", message: error.message });
      }
    }
  },
);

userRouter.get("/", auth, async (request, response) => {
  const userId = request.tokenData.id;

  if (!userId) {
    throw new AppError("Usuário não encontrado", 404);
  }
  try {
    const user = await UserCtrl.get(userId);
    return response.json({ status: "success", data: user });
  } catch (error) {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "failed", message: error.message });
    }
  }
});

userRouter.post(
  "/login",
  validateData(loginUserSchema),
  async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = { email, password };

      const userLogged = await UserCtrl.login(user);

      if (userLogged) {
        return response.json({ status: 200, token: userLogged });
      }
      return response.json({
        status: "error",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ status: "failed", message: error.message });
      }
    }
  },
);

userRouter.put(
  "/change-password",
  validateData(changePasswordSchema),
  async (request, response) => {
    try {
      const { email, old_password, new_password } = request.body;

      const user = { email, old_password, new_password };

      const emailExist = await UserCtrl.checkEmailExist(email);

      if (!emailExist) {
        throw new AppError("Usuário não encontrado", 404);
      }

      const passwordChanged = await UserCtrl.changePassword(user);

      if (passwordChanged) {
        return response.json({
          status: 200,
          message: "Senha alterada com sucesso",
        });
      }
      return response.json({
        status: "error",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ status: "failed", message: error.message });
      }
    }
  },
);
