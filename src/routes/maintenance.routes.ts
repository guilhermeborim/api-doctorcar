import { Router } from "express";
import { create } from "../controllers/maintenance";
export const maintenance = Router();

maintenance.post("/", async (request, response) => {
  try {
    const {
      kilometersAtService,
      kilometersNextService,
      dateOfService,
      serviceCoast,
      vehicleId,
      maintenanceTypeId,
    } = request.body;

    const register = {
      kilometersAtService,
      kilometersNextService,
      dateOfService,
      serviceCoast,
      vehicle: vehicleId,
      maintenanceType: maintenanceTypeId,
    };
    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json({
        status: 200,
        message: "Maintenance Created",
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
