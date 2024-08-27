import { Router } from "express";
import { store } from "../controllers/user";

export const userRouter = Router();

userRouter.post("/", async (request, response) => {
  try {
    const { name, email } = request.body;

    const register = { name, email };

    const registerSaved = await store(register);

    if (registerSaved) {
      return response.json({ status: "success", data: register });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});
