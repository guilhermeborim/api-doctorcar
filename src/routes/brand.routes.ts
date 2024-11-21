import { Router } from "express";
import { create, returnAll } from "../controllers/brand";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
export const brand = Router();

brand.post("/", async (request, response) => {
  try {
    const { name, description, logo } = request.body;

    const register = { name, description, logo };
    const registerSaved = await create(register);

    if (registerSaved) {
      return response.json(
        new SuccessResponse("Brand created successfuly", registerSaved),
      );
    }
    return response.json(new ErrorResponse("Failed to create brand"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

brand.get("/", async (request, response) => {
  try {
    const brands = await returnAll();

    if (brands) {
      return response.json(
        new SuccessResponse("All brands successfuly", brands),
      );
    }
    return response.json(new ErrorResponse("Failet get all brands"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
