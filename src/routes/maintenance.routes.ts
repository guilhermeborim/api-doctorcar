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
import { validateData } from "../middleware/validate";
import {
  createMaintenanceSchema,
  editMaintenanceSchema,
} from "../utils/maintenance/validation";
import auth from "../middleware/auth";
export const maintenance = Router();

maintenance.post("/", auth, async (request, response) => {
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
    console.log(register);

    const { data, message, status } = await create(register);

    console.log(data);
    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao criar Manutenção"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.get("/", auth, async (request, response) => {
  try {
    const { data, message, status } = await returnAll();

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar Manutenção"));
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

      const { data } = await returnById(idmaintenance);

      if (!data) {
        return response
          .status(404)
          .json(new ErrorResponse("Veículo nao existe"));
      }

      const updateMaintenance = {
        kilometers_at_service,
        kilometers_next_service,
        date_of_service,
        service_coast,
        vehicle_id,
        maintenance_type_id,
      };

      const {
        data: dataMaintenance,
        message,
        status,
      } = await update(idmaintenance, updateMaintenance);

      if (status === 200) {
        return response.json(new SuccessResponse(message, dataMaintenance));
      }

      return response
        .status(400)
        .json(new ErrorResponse("Falha ao modificar Manutenção"));
    } catch (error) {
      return response.json(new ServerErrorResponse(error));
    }
  },
);

maintenance.get("/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const { data, message, status } = await returnById(id);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }

    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar Manutenção"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.get("/vehicle/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const { data, message, status } = await returnByVehicle(id);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao buscar Manutenção"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});

maintenance.delete("/delete/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;

    const { data, message, status } = await deletar(id);

    if (status === 200) {
      return response.json(new SuccessResponse(message, data));
    }
    return response
      .status(400)
      .json(new ErrorResponse("Falha ao deletar Manutenção"));
  } catch (error) {
    return response.json(new ServerErrorResponse(error));
  }
});
