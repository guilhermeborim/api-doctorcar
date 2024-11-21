import { Router } from "express";
import {
  create,
  deletar,
  returnAll,
  returnById,
  update,
} from "../controllers/vehicle";
import auth from "../middleware/auth";
import { validateData } from "../middleware/validate";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
import {
  createVehicleSchema,
  editVehicleSchema,
} from "../utils/vehicle/validation";
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
        state_vehicle_id,
      } = request.body;
      const { id } = request.tokenData;
      const register = {
        model,
        year,
        license_plate,
        kilometers_driven,
        daily_mileage,
        brand_id,
        state_vehicle_id,
      };
      const { data, message, status } = await create(register, id);

      if (status === 200) {
        return response.json(new SuccessResponse(message, data));
      }

      return response.status(400).json(new ErrorResponse(message));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

vehicle.patch(
  "/",
  auth,
  validateData(editVehicleSchema),
  async (request, response) => {
    try {
      const {
        idvehicle,
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        state_vehicle_id,
      } = request.body;
      const { id } = request.tokenData;

      const { data } = await returnById(idvehicle, id);

      if (!data) {
        return response
          .status(404)
          .json(new ErrorResponse("Veículo nao existe"));
      }

      const updatedVehicleData = {
        model,
        license_plate,
        year,
        kilometers_driven,
        daily_mileage,
        brand_id,
        state_vehicle_id,
      };

      const {
        data: dataVehicle,
        message,
        status,
      } = await update(idvehicle, updatedVehicleData);

      if (status === 200) {
        return response.json(new SuccessResponse(message, dataVehicle));
      }
      return response
        .status(400)
        .json(new ErrorResponse("Falha ao criar Veículo"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

vehicle.get("/", auth, async (request, response) => {
  try {
    const { id } = request.tokenData;
    const { data, message, status } = await returnAll(id);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar Veículo"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

vehicle.get("/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;
    const { id: iduser } = request.tokenData;
    const { data, message, status } = await returnById(id, iduser);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar Veículo"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

vehicle.delete("/delete/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;
    const { id: iduser } = request.tokenData;

    const { data, message, status } = await deletar(id, iduser);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao deletar Veículo"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
