import { Router } from "express";
import {
  checkVehicleExist,
  create,
  get,
  getById,
} from "../controllers/maintenance";
import { AppError } from "../errors/error";
import auth from "../middleware/auth";
import { validateData } from "../middleware/validate";
import { createMaintenanceSchema } from "../utils";
export const maintenance = Router();

maintenance.post(
  "/",
  auth,
  validateData(createMaintenanceSchema),
  async (request, response) => {
    try {
      const {
        kilometers_at_service,
        kilometers_next_service,
        date_of_service,
        service_coast,
        vehicle_id,
        maintenance_type_id,
      } = request.body;

      const register = {
        kilometers_at_service,
        kilometers_next_service,
        date_of_service,
        service_coast,
        vehicle_id,
        maintenance_type_id,
      };
      const vehicleExist = await checkVehicleExist(vehicle_id);
      if (!vehicleExist) {
        throw new AppError("Veículo não existe.", 404);
      }

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
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
    }
  },
);

maintenance.get("/", auth, async (request, response) => {
  try {
    const maintenance = await get();
    return response.json({ status: "success", data: maintenance });
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  }
});

maintenance.get("/:id", auth, async (request, response) => {
  const { id } = request.params;

  try {
    const maintenance = await getById(id);
    return response.json({ status: "success", data: maintenance });
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  }
});
