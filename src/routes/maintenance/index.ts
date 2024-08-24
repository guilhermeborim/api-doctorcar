import { Router } from "express";
import { createMaintenance } from "../../controllers/maintenance/createController";
import { getMaintenance } from "../../controllers/maintenance/getController";
import { getMaintenanceId } from "../../controllers/maintenance/getIdController";
import auth from "../../middleware/auth";
import { validateData } from "../../middleware/validate";
import { createMaintenanceSchema } from "../../utils/maintenance/validation";

const maintenanceRouter = Router();

maintenanceRouter.post(
  "/create",
  auth,
  validateData(createMaintenanceSchema),
  createMaintenance,
);
maintenanceRouter.get("/get/:id", auth, getMaintenanceId);
maintenanceRouter.get("/get", auth, getMaintenance);

export default maintenanceRouter;
