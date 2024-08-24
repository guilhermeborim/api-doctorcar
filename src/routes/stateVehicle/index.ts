import { Router } from "express";
import { createStateVehicle } from "../../controllers/stateVehicle/createController";

const stateVehicleRouter = Router();

stateVehicleRouter.post("/create", createStateVehicle);

export default stateVehicleRouter;
