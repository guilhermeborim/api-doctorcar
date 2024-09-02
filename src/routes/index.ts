import { Router } from "express";

const router = Router();

import { brand } from "./brand.routes";
import { maintenance } from "./maintenance.routes";
import { maintenanceType } from "./maintenanceType.routes";
import { stateVehicle } from "./stateVehicle.routes";
import { userRouter } from "./user.routes";
import { vehicle } from "./vehicle.routes";

router.use("/user", userRouter);
router.use("/state-vehicle", stateVehicle);
router.use("/maintenance-type", maintenanceType);
router.use("/brand", brand);
router.use("/vehicle", vehicle);
router.use("/maintenance", maintenance);

export default router;
