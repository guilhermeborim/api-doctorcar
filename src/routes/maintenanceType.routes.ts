import { Router } from "express";
import { create } from "../controllers/typeMaintenance";
export const maintenanceType = Router();

maintenanceType.post("/", async (request, response) => {
  try {
    const { name, benefits, icon } = request.body;

    const register = { name, benefits, icon };
    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json({
        status: 200,
        message: "Maintenance Type Created",
      });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});

// maintenanceType.get("/", async (request, response) => {
//   try {
//     const stateVehicle = await get();
//     return response.json({ status: "success", data: stateVehicle });
//   } catch (error) {
//     return response.json({ status: "failed", message: error });
//   }
// });
