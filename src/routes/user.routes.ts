import { Router } from "express";
import { create, get, login } from "../controllers/user";
import auth from "../middleware/auth";
export const userRouter = Router();

userRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const register = { name, email, password };

    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json({ status: 200, data: register });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});

userRouter.get("/", auth, async (request, response) => {
  const userId = request.tokenData.id;
  try {
    const user = await get(userId);
    return response.json({ status: "success", data: user });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});

userRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = { email, password };

    const userLogged = await login(user);

    if (userLogged) {
      return response.json({ status: 200, data: userLogged });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});
