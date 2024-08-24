import { Router } from "express";
import { changePassword } from "../../controllers/user/changePasswordController";
import { createUser } from "../../controllers/user/createController";
import { getUser } from "../../controllers/user/getController";
import { loginUser } from "../../controllers/user/loginController";
import { logoutUser } from "../../controllers/user/logoutController";
import auth from "../../middleware/auth";
import { validateData } from "../../middleware/validate";
import {
  changePasswordSchema,
  createUserSchema,
  loginUserSchema,
} from "../../utils/user/validation";

const userRouter = Router();

userRouter.post("/create", validateData(createUserSchema), createUser);
userRouter.post("/login", validateData(loginUserSchema), loginUser);
userRouter.post(
  "/change-password",
  validateData(changePasswordSchema),
  changePassword,
);
userRouter.get("/get", auth, getUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
