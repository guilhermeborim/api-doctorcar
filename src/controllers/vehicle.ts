import { prismaClient } from "../prisma";
import { VehicleCreateProps } from "../types";

const create = async (vehicle: VehicleCreateProps) => {
  try {
    const rows = await prismaClient.vehicle.create({
      data: {
        model: vehicle.model,
        license_plate: vehicle.license_plate,
        year: vehicle.year,
        daily_mileage: vehicle.daily_mileage,
        kilometers_driven: vehicle.kilometers_driven,
        brand_id: vehicle.brand_id,
        owner_id: vehicle.owner_id,
        state_vehicle_id: vehicle.state_vehicle_id,
      },
    });

    return rows;
  } catch (error) {
    return error;
  }
};

const returnAll = async (owner_id: string) => {
  try {
    const rows = await prismaClient.vehicle.findMany({
      where: {
        owner_id: owner_id,
      },
      include: {
        brand: true,
        state_vehicle: true,
      },
    });
    return rows;
  } catch (error) {
    return error;
  }
};

const returnById = async (vehicle_id: string, owner_id: string) => {
  try {
    const rows = await prismaClient.vehicle.findUnique({
      where: {
        idvehicle: vehicle_id,
        owner_id: owner_id,
      },
    });
    return rows;
  } catch (error) {
    return error;
  }
};

const update = async (vehicle_id: string, vehicle: VehicleCreateProps) => {
  try {
    const rows = await prismaClient.vehicle.update({
      data: {
        model: vehicle.model,
        license_plate: vehicle.license_plate,
        year: vehicle.year,
        daily_mileage: vehicle.daily_mileage,
        kilometers_driven: vehicle.kilometers_driven,
        brand_id: vehicle.brand_id,
        state_vehicle_id: vehicle.state_vehicle_id,
      },
      where: {
        idvehicle: vehicle_id,
      },
    });
    return rows;
  } catch (error) {
    return error;
  }
};

const deletar = async (vehicle_id: string, owner_id: string) => {
  try {
    const rows = await prismaClient.vehicle.delete({
      where: {
        idvehicle: vehicle_id,
        owner_id: owner_id,
      },
    });
    return rows;
  } catch (error) {
    return error;
  }
};

export { create, returnAll, returnById, update, deletar };
