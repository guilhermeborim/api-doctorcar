import { Router } from "express";
import { create, returnAll } from "../controllers/stateVehicle";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
export const stateVehicle = Router();

stateVehicle.post("/", async (request, response) => {
  try {
    const { name } = request.body;

    const registerSaved = await create(name);

    if (registerSaved) {
      return response.json(
        new SuccessResponse("State vehicle created successfuly", registerSaved),
      );
    }
    return response.json(new ErrorResponse("Failed state vehicle create"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

stateVehicle.get("/", async (request, response) => {
  try {
    const stateVehicle = await returnAll();

    if (stateVehicle) {
      return response.json(
        new SuccessResponse("Get state vehicle successfuly", stateVehicle),
      );
    }
    return response.json(new ErrorResponse("Failed get state vehicle"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
