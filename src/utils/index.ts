import { createMaintenanceSchema } from "../utils/maintenance/validation";
import {
  changePasswordSchema,
  createUserSchema,
  loginUserSchema,
} from "../utils/user/validation";
import {
  createVehicleSchema,
  editVehicleSchema,
} from "../utils/vehicle/validation";

export {
  changePasswordSchema,
  createMaintenanceSchema,
  createUserSchema,
  createVehicleSchema,
  editVehicleSchema,
  loginUserSchema,
};
