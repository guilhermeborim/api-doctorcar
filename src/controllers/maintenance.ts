import { prismaClient } from "../prisma";
import { MaintenanceCreateProps } from "../types";

const create = async (maintenance: MaintenanceCreateProps) => {
  try {
    const rows = await prismaClient.maintenance.create({
      data: {
        date_of_service: maintenance.date_of_service,
        kilometers_at_service: maintenance.kilometers_at_service,
        kilometers_next_service: maintenance.kilometers_next_service,
        service_coast: maintenance.service_coast,
        maintenance_type_id: maintenance.maintenance_type_id.id,
        vehicle_id: maintenance.vehicle_id.id,
      },
    });

    return rows;
  } catch (error) {
    return error;
  }
};

const update = async (
  maintenance_id: string,
  maintenance: MaintenanceCreateProps,
) => {
  try {
    const row = await prismaClient.maintenance.update({
      data: {
        date_of_service: maintenance.date_of_service,
        kilometers_at_service: maintenance.kilometers_at_service,
        kilometers_next_service: maintenance.kilometers_next_service,
        service_coast: maintenance.service_coast,
        maintenance_type_id: maintenance.maintenance_type_id.id,
        vehicle_id: maintenance.vehicle_id.id,
      },
      where: {
        idmaintenance: maintenance_id,
      },
    });
    return row;
  } catch (error) {
    return error;
  }
};

const returnAll = async () => {
  try {
    const rows = await prismaClient.maintenance.findMany({});

    return rows;
  } catch (error) {
    return error;
  }
};

const returnById = async (maintenance_id: string) => {
  try {
    const row = await prismaClient.maintenance.findUnique({
      where: {
        idmaintenance: maintenance_id,
      },
    });

    return row;
  } catch (error) {
    return error;
  }
};

const returnByVehicle = async (vehicle_id: string) => {
  try {
    const rows = await prismaClient.maintenance.findMany({
      where: {
        vehicle_id: vehicle_id,
      },
    });

    return rows;
  } catch (error) {
    return error;
  }
};

const deletar = async (maintenance_id: string) => {
  try {
    const row = await prismaClient.maintenance.delete({
      where: {
        idmaintenance: maintenance_id,
      },
    });
    return row;
  } catch (error) {
    return error;
  }
};
export { create, update, returnAll, returnById, returnByVehicle, deletar };
