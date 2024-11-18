import { Router } from "express";
import { changePassword, create, login, returnById } from "../controllers/user";
import auth from "../middleware/auth";
import { validateData } from "../middleware/validate";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
import {
  changePasswordUserSchema,
  createUserSchema,
  loginUserSchema,
} from "../utils/user/validation";

export const userRouter = Router();

userRouter.post(
  "/",
  validateData(createUserSchema),
  async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const { data, message, status } = await create({ name, email, password });

      if (status === 200) {
        return response.json(new SuccessResponse(message, data));
      }
      return response
        .status(400)
        .json(new ErrorResponse("Falha ao criar o usuário"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

userRouter.get("/", auth, async (request, response) => {
  const { id } = request.tokenData;
  try {
    const { data, message, status } = await returnById(id);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar o usuário"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

userRouter.post(
  "/login",
  validateData(loginUserSchema),
  async (request, response) => {
    try {
      const { email, password } = request.body;
      const register = {
        email,
        password,
      };

      const { status, message, data } = await login(register);

      if (status === 200) {
        return response.json(new SuccessResponse(message, data));
      }

      return response.status(400).json({
        message: message,
      });
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

userRouter.put(
  "/change-password",
  validateData(changePasswordUserSchema),
  async (request, response) => {
    try {
      const { email, old_password, new_password } = request.body;

      const { data, message, status } = await changePassword({
        email,
        new_password,
        old_password,
      });

      if (status === 200) {
        return response.json(new SuccessResponse(message, data));
      }

      return response
        .status(400)
        .json(new ErrorResponse("Falha ao modificar a senha"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);
