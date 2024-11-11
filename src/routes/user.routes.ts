import { Router } from "express";
import { returnById, login, create, changePassword } from "../controllers/user";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
import { validateData } from "../middleware/validate";
import {
  changePasswordUserSchema,
  createUserSchema,
  loginUserSchema,
} from "../utils/user/validation";
import auth from "../middleware/auth";

export const userRouter = Router();

userRouter.post(
  "/",
  validateData(createUserSchema),
  async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const user = await create({ name, email, password });

      if (user) {
        return response.json(
          new SuccessResponse("User created successfuly", user),
        );
      }
      return response.json(new ErrorResponse("Failed created user"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

userRouter.get("/", auth, async (request, response) => {
  const { id } = request.tokenData;
  try {
    const user = await returnById(id);

    if (user) {
      return response.json(new SuccessResponse("Get user successfuly", user));
    }
    return response.json(new ErrorResponse("Failed get user"));
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

      const token = await login(register);

      if (token) {
        return response.json({
          status: 200,
          message: "Login user successfuly",
          data: token,
        });
      }

      return response.json(new ErrorResponse("Failed login user"));
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

      const updatedUser = await changePassword({
        email,
        new_password,
        old_password,
      });

      if (updatedUser) {
        return response.json(
          new SuccessResponse("Change Password user successfuly", updatedUser),
        );
      }

      return response.json(new ErrorResponse("Failed change password user"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);
