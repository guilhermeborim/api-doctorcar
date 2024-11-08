import { response, Router } from "express";
import {
  create,
  update,
  deletar,
  returnAll,
  returnById,
  returnAllVehiclesByUser,
} from "../controllers/vehicle";
import { VehicleCreateProps } from "../types";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
import { validateData } from "../middleware/validate";
import {
  createVehicleSchema,
  editVehicleSchema,
} from "../utils/vehicle/validation";
export const vehicle = Router();

vehicle.post(
  "/",
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
        year,
        license_plate,
        kilometers_driven,
        daily_mileage,
        brand_id,
        owner_id,
        state_vehicle_id,
      };
      const registerSaved = await create(register);

      if (registerSaved) {
        return response.json(
          new SuccessResponse("Vehicle created successfuly", registerSaved),
        );
      }
      return response.json(new ErrorResponse("Failed to create vehicle"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

vehicle.patch(
  "/",
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
        owner_id,
        state_vehicle_id,
      } = request.body;

      const vehicle = (await returnById(idvehicle)) as VehicleCreateProps;

      vehicle.model = model;
      vehicle.license_plate = license_plate;
      vehicle.year = year;
      vehicle.kilometers_driven = kilometers_driven;
      vehicle.daily_mileage = daily_mileage;
      vehicle.brand_id = brand_id;
      vehicle.owner_id = owner_id;
      vehicle.state_vehicle_id = state_vehicle_id;

      const registerUpdate = await update(idvehicle, vehicle);

      if (registerUpdate) {
        return response.json(
          new SuccessResponse("Vehicle updated successfuly", registerUpdate),
        );
      }
      return response.json(new ErrorResponse("Failed to update vehicle"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

vehicle.get("/", async (request, response) => {
  try {
    const vehicles = await returnAll();

    if (vehicles) {
      return response.json(
        new SuccessResponse("All vehicles successfuly", vehicles),
      );
    }
    return response.json(new ErrorResponse("Failed to get vehicles"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

vehicle.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const vehicle = await returnById(id);

    if (vehicle) {
      return response.json(
        new SuccessResponse("Vehicle by id successfuly", vehicle),
      );
    }
    return response.json(new ErrorResponse("Failed to get vehicle by id"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

vehicle.get("/vehicles/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const vehicles = await returnAllVehiclesByUser(id);

    if (vehicles) {
      return response.json(
        new SuccessResponse("All vehicles by user successfuly", vehicles),
      );
    }
    return response.json(new ErrorResponse("Failed get all vehicles by user"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
vehicle.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const vehicle = await deletar(id);

    if (vehicle) {
      return response.json(
        new SuccessResponse("Delete vehicle by id successfuly", vehicle),
      );
    }
    return response.json(new ErrorResponse("Failed delete vehicle by id"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
