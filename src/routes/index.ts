import { Router } from "express";

const router = Router();

import routesBrand from "./brand";
import routesMaintenance from "./maintenance";
import routesMaintenanceType from "./maintenanceType";
import routesStateVehicle from "./stateVehicle";
import routesUser from "./user";
import routesVehicle from "./vehicle";

router.use("/user", routesUser);
router.use("/vehicle", routesVehicle);
router.use("/state-vehicle", routesStateVehicle);
router.use("/maintenance-type", routesMaintenanceType);
router.use("/maintenance", routesMaintenance);
router.use("/brand", routesBrand);

export default router;
