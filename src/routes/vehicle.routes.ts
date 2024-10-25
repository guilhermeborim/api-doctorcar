import { Router } from "express";
import {
  checkLicensePlateExists,
  create,
  deletar,
  get,
  update,
} from "../controllers/vehicle";
import { AppError } from "../errors/error";
import auth from "../middleware/auth";
import { validateData } from "../middleware/validate";
import { createVehicleSchema, editVehicleSchema } from "../utils";
export const vehicle = Router();

vehicle.post(
  "/",
  auth,
  validateData(createVehicleSchema),
  async (request, response) => {
    try {
      const {
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        owner_id,
        state_vehicle_id,
      } = request.body;

      const register = {
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        owner_id,
        state_vehicle_id,
      };

      const existingVehicle = await checkLicensePlateExists(license_plate);

      if (existingVehicle) {
        throw new AppError("Esta placa já está cadastrada", 400);
      }
      const registerSaved = await create(register);

      if (registerSaved) {
        return response.json({
          status: 200,
          message: "Veículo criado",
        });
      }
      return response.json({
        status: "error",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ status: "failed", message: error.message });
      }
    }
  },
);

vehicle.get("/", auth, async (request, response) => {
  try {
    const vehicle = await get();

    return response.json({ status: "success", data: vehicle });
  } catch (error) {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "failed", message: error.message });
    }
  }
});

vehicle.put(
  "/:id",
  auth,
  validateData(editVehicleSchema),
  async (request, response) => {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        status: "failed",
        message: "ID is required",
      });
    }
    try {
      const {
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        state_vehicle_id,
      } = request.body;

      const register = {
        id,
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        state_vehicle_id,
      };

      const registerSaved = await update(register);
      if (registerSaved) {
        return response.json({
          status: 200,
          message: "Veículo atualizado",
        });
      }
      return response.json({
        status: "error",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ status: "failed", message: error.message });
      }
    }
  },
);

vehicle.delete("/:id", auth, async (request, response) => {
  const { id } = request.params;
  try {
    const vehicle = await deletar(id);
    return response.json({ status: "success", data: vehicle });
  } catch (error) {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "failed", message: error.message });
    }
  }
});
