import { prismaClient } from "../prisma";
import { MaintenanceCreateProps } from "../types";
import cron from "node-cron";

// cron.schedule("* * * * *", async () => {
//   console.log("Iniciando verificação de manutenções expiradas...");
//   await expireMaintenances();
// });

const create = async (maintenance: MaintenanceCreateProps) => {
  try {
    const rows = await prismaClient.maintenance.create({
      data: {
        name: maintenance.name,
        date_of_service: maintenance.date_of_service,
        kilometers_at_service: maintenance.kilometers_at_service,
        kilometers_next_service: maintenance.kilometers_next_service,
        service_coast: maintenance.service_coast,
        vehicle_id: maintenance.vehicle_id,
        active: true,
      },
    });

    return {
      status: 200,
      message: "Manutenção criada com sucesso",
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

const update = async (
  maintenance_id: string,
  maintenance: MaintenanceCreateProps,
) => {
  try {
    const row = await prismaClient.maintenance.update({
      data: {
        name: maintenance.name,
        date_of_service: maintenance.date_of_service,
        kilometers_at_service: maintenance.kilometers_at_service,
        kilometers_next_service: maintenance.kilometers_next_service,
        service_coast: maintenance.service_coast,
        vehicle_id: maintenance.vehicle_id,
      },
      where: {
        idmaintenance: maintenance_id,
      },
    });

    return {
      status: 200,
      message: "Manutenção modificada com sucesso",
      data: row,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const returnAll = async () => {
  try {
    const rows = await prismaClient.maintenance.findMany();

    return {
      status: 200,
      message: "Manutenção encontrada com sucesso",
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

const returnById = async (maintenance_id: string) => {
  try {
    const row = await prismaClient.maintenance.findUnique({
      where: {
        idmaintenance: maintenance_id,
      },
    });

    return {
      status: 200,
      message: "Manutenção encontrada com sucesso",
      data: row,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const returnByVehicle = async (vehicle_id: string) => {
  try {
    const rows = await prismaClient.maintenance.findMany({
      where: {
        vehicle_id: vehicle_id,
      },
    });

    return {
      status: 200,
      message: "Manutenção encontrada com sucesso",
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

const deletar = async (maintenance_id: string) => {
  try {
    const row = await prismaClient.maintenance.delete({
      where: {
        idmaintenance: maintenance_id,
      },
    });

    return {
      status: 200,
      message: "Manutenção deletada com sucesso",
      data: row,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

const expireMaintenances = async () => {
  try {
    const activeMaintenances = await prismaClient.maintenance.findMany({
      where: {
        active: true,
      },
      include: {
        vehicle: true,
      },
    });

    const expiredMaintenances = activeMaintenances.filter((maintenance) => {
      if (!maintenance.vehicle?.daily_mileage) {
        return false;
      }

      const remainingKilometers =
        maintenance.kilometers_next_service - maintenance.kilometers_at_service;

      const remainingDays =
        remainingKilometers / maintenance.vehicle.daily_mileage;

      return remainingDays <= 1;
    });

    for (const maintenance of expiredMaintenances) {
      await prismaClient.maintenance.update({
        where: {
          idmaintenance: maintenance.idmaintenance,
        },
        data: {
          active: false,
        },
      });

      await prismaClient.maintenanceHistory.create({
        data: {
          maintenance_id: maintenance.idmaintenance,
          vehicle_id: maintenance.vehicle_id,
        },
      });
    }

    console.log(
      `${expiredMaintenances.length} manutenção(ões) expiradas e movidas para histórico.`,
    );
  } catch (error) {
    return error;
  }
};

const returnHistoryMaintenanceByVehicle = async (vehicle_id: string) => {
  try {
    const history = await prismaClient.maintenanceHistory.findMany({
      where: {
        vehicle_id: vehicle_id,
      },
      include: {
        maintenance: true,
        vehicle: true,
      },
    });
    console.log(history);
    return {
      status: 200,
      message: "Histórico encontrado com sucesso",
      data: history,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erro no servidor",
      data: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
export {
  create,
  deletar,
  returnAll,
  returnById,
  returnByVehicle,
  update,
  expireMaintenances,
  returnHistoryMaintenanceByVehicle,
};
