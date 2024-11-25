import { prismaClient } from "../prisma";
import { MaintenanceTypeCreateProps } from "../types";

const create = async (maintenanceType: MaintenanceTypeCreateProps) => {
  try {
    const rows = await prismaClient.maintenanceType.create({
      data: {
        icon: maintenanceType.icon,
        name: maintenanceType.name,
        benefits: maintenanceType.benefits,
        active: maintenanceType.active,
      },
    });
    return rows;
  } catch (error) {
    return error;
  }
};

const returnAll = async () => {
  try {
    const rows = await prismaClient.maintenanceType.findMany({});

    return rows;
  } catch (error) {
    return error;
  }
};

export { create, returnAll };
