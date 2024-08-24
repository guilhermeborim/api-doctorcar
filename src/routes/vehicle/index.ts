import { Router } from "express";
import { createVehicle } from "../../controllers/vehicle/createController";
import { deleteVehicle } from "../../controllers/vehicle/deleteController";
import { getVehicle } from "../../controllers/vehicle/getController";
import { updateVehicle } from "../../controllers/vehicle/updateController";
import auth from "../../middleware/auth";
import { validateData } from "../../middleware/validate";
import {
  createVehicleSchema,
  editVehicleSchema,
} from "../../utils/vehicle/validation";

const vehicleRouter = Router();

vehicleRouter.post(
  "/create",
  auth,
  validateData(createVehicleSchema),
  createVehicle,
);
vehicleRouter.put(
  "/edit/:id",
  auth,
  validateData(editVehicleSchema),
  updateVehicle,
);
vehicleRouter.delete("/delete/:id", auth, deleteVehicle);
vehicleRouter.get("/get", auth, getVehicle);

export default vehicleRouter;
