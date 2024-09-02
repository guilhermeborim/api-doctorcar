import { Router } from "express";
import { create, get } from "../controllers/stateVehicle";
export const stateVehicle = Router();

stateVehicle.post("/", async (request, response) => {
  try {
    const { name } = request.body;

    const registerSaved = await create(name);

    if (registerSaved) {
      return response.json({ status: 200, message: "State Vehicle created" });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});

stateVehicle.get("/", async (request, response) => {
  try {
    const stateVehicle = await get();
    return response.json({ status: "success", data: stateVehicle });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});
