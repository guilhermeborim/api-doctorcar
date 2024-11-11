import { Router } from "express";
import {
  create,
  returnAll,
  returnById,
  update,
  returnByVehicle,
  deletar,
} from "../controllers/maintenance";
import {
  ErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../types/response";
import { MaintenanceCreateProps } from "../types";
import { validateData } from "../middleware/validate";
import {
  createMaintenanceSchema,
  editMaintenanceSchema,
} from "../utils/maintenance/validation";
import auth from "../middleware/auth";
export const maintenance = Router();

maintenance.post(
  "/",
  auth,
  validateData(createMaintenanceSchema),
  async (request, response) => {
    try {
      const {
        kilometers_at_service,
        kilometers_next_service,
        date_of_service,
        service_coast,
        vehicle_id,
        maintenance_type_id,
      } = request.body;

      const register = {
        date_of_service,
        kilometers_at_service,
        kilometers_next_service,
        service_coast,
        maintenance_type_id,
        vehicle_id,
      };

      const registerSaved = await create(register);

      if (registerSaved) {
        return response.json(
          new SuccessResponse("Maintenance created successfuly", registerSaved),
        );
      }
      return response.json(new ErrorResponse("Failed to created maintenance"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

maintenance.get("/", auth, async (request, response) => {
  try {
    const maintenances = await returnAll();

    if (maintenances) {
      return response.json(
        new SuccessResponse("Get maintenances successfuly", maintenances),
      );
    }
    return response.json(new ErrorResponse("Failed get maintenances"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.patch(
  "/",
  auth,
  validateData(editMaintenanceSchema),
  async (request, response) => {
    try {
      const {
        idmaintenance,
        kilometers_at_service,
        kilometers_next_service,
        date_of_service,
        service_coast,
        vehicle_id,
        maintenance_type_id,
      } = request.body;

      const maintenance = (await returnById(
        idmaintenance,
      )) as MaintenanceCreateProps;

      maintenance.kilometers_at_service = kilometers_at_service;
      maintenance.kilometers_next_service = kilometers_next_service;
      maintenance.date_of_service = date_of_service;
      maintenance.service_coast = service_coast;
      maintenance.vehicle_id = vehicle_id;
      maintenance.maintenance_type_id = maintenance_type_id;

      const registerUpdate = await update(idmaintenance, maintenance);

      if (registerUpdate) {
        return response.json(
          new SuccessResponse(
            "Maintenance updated successfuly",
            registerUpdate,
          ),
        );
      }

      return response.json(new ErrorResponse("Failed updated maintenance"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

maintenance.get("/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const maintenance = await returnById(id);

    if (maintenance) {
      return response.json(
        new SuccessResponse("Get maintenance by id successfuly", maintenance),
      );
    }

    return response.json(new ErrorResponse("Failed get maintenance by id"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.get("/vehicle/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const maintenances = await returnByVehicle(id);

    if (maintenances) {
      return response.json(
        new SuccessResponse(
          "Get maintenance by vehicle successfuly",
          maintenances,
        ),
      );
    }
    return response.json(
      new ErrorResponse("Failed get maintenance by vehicle"),
    );
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.delete("/delete/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const maintenance = await deletar(id);

    if (maintenance) {
      return response.json(
        new SuccessResponse(
          "Delete maintenance by id successfuly",
          maintenance,
        ),
      );
    }
    return response.json(
      new ErrorResponse("Failed to delete maintenance by id"),
    );
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
