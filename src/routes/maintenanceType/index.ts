import { Router } from "express";
import { createMaintenanceType } from "../../controllers/maintenanceType/createController";

const maintenanceTypeRouter = Router();

maintenanceTypeRouter.post("/create", createMaintenanceType);

export default maintenanceTypeRouter;
