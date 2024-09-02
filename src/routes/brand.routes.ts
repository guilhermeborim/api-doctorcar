import { Router } from "express";
import { create } from "../controllers/brand";
export const brand = Router();

brand.post("/", async (request, response) => {
  try {
    const { name, description, logo } = request.body;

    const register = { name, description, logo };
    const registerSaved = await create(register);

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

// stateVehicle.get("/", async (request, response) => {
//   try {
//     const stateVehicle = await get();
//     return response.json({ status: "success", data: stateVehicle });
//   } catch (error) {
//     return response.json({ status: "failed", message: error });
//   }
// });
