import { Router } from "express";
import { create, returnAll } from "../controllers/typeMaintenance";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
export const maintenanceType = Router();

maintenanceType.post("/", async (request, response) => {
  try {
    const { name, benefits, icon } = request.body;

    const register = { name, benefits, icon };
    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json(
        new SuccessResponse(
          "Maintenance Type created successfuly",
          registerSaved,
        ),
      );
    }

    return response.json(new ErrorResponse("Failed maintenance type created"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenanceType.get("/", async (request, response) => {
  try {
    const maintenanceTypes = await returnAll();

    if (maintenanceTypes) {
      return response.json(
        new SuccessResponse(
          "Get maintenance types successfuly",
          maintenanceTypes,
        ),
      );
    }
    return response.json(new ErrorResponse("Failed get maintenance types"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
