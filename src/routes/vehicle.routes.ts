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

      const existingVehicle = await checkLicensePlateExists(licensePlate);

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
        licensePlate,
        year,
        kilometersDriven,
        dailyMileage,
        brandId,
        stateVehicleId,
      } = request.body;

      const register = {
        id,
        model,
        licensePlate,
        year,
        kilometersDriven,
        dailyMileage,
        brand: brandId,
        stateVehicle: stateVehicleId,
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
