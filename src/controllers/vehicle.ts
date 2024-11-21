import { prismaClient } from "../prisma";
import { VehicleCreateProps, VehicleProps } from "../types";
import { ResponseApi } from "../types/response";

const create = async (vehicle: VehicleCreateProps, owner_id: string) => {
  try {
    const plateExist = await prismaClient.vehicle.findUnique({
      where: {
        license_plate: vehicle.license_plate,
      },
    });

    if (plateExist) {
      return { status: 400, message: "Placa já está cadastrada", data: null };
    }
    const rows = await prismaClient.vehicle.create({
      data: {
        model: vehicle.model,
        license_plate: vehicle.license_plate,
        year: vehicle.year,
        daily_mileage: vehicle.daily_mileage,
        kilometers_driven: vehicle.kilometers_driven,
        brand_id: vehicle.brand_id,
        owner_id: owner_id,
        state_vehicle_id: vehicle.state_vehicle_id,
      },
    });

    return { status: 200, message: "Veículo criado com sucesso", data: rows };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
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

    return {
      status: 200,
      message: "Veículo encontrado com sucesso",
      data: rows,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const returnById = async (vehicle_id: string, owner_id: string) => {
  try {
    const rows = await prismaClient.vehicle.findUnique({
      where: {
        idvehicle: vehicle_id,
        owner_id: owner_id,
      },
      include: {
        brand: true,
        state_vehicle: true,
        owner: true,
      },
    });

    return {
      status: 200,
      message: "Veículo encontrado com sucesso",
      data: rows,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const update = async (vehicle_id: string, vehicle: VehicleCreateProps) => {
  try {
    const plateExist = await prismaClient.vehicle.findUnique({
      where: {
        license_plate: vehicle.license_plate,
      },
    });

    if (plateExist) {
      return { status: 400, message: "Placa já está cadastrada", data: null };
    }

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

    return {
      status: 200,
      message: "Veículo modificado com sucesso",
      data: rows,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
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

    return { status: 200, message: "Veículo deletado com sucesso", data: rows };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export { create, deletar, returnAll, returnById, update };
