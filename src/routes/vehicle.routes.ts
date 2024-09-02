import { Router } from "express";
import { create, get } from "../controllers/vehicle";
export const vehicle = Router();

vehicle.post("/", async (request, response) => {
  try {
    const {
      model,
      licensePlate,
      year,
      kilometersDriven,
      dailyMileage,
      brandId,
      ownerId,
      stateVehicleId,
    } = request.body;

    const register = {
      model,
      licensePlate,
      year,
      kilometersDriven,
      dailyMileage,
      brand: brandId,
      owner: ownerId,
      stateVehicle: stateVehicleId,
    };

    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json({
        status: 200,
        message: "Vehicle created",
        data: registerSaved,
      });
    }
    return response.json({
      status: "error",
    });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});

vehicle.get("/", async (request, response) => {
  try {
    const vehicle = await get();
    return response.json({ status: "success", data: vehicle });
  } catch (error) {
    return response.json({ status: "failed", message: error });
  }
});
