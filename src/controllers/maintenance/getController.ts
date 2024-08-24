import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const getMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await prisma.maintenance.findMany({
      include: {
        vehicle: {
          include: {
            brand: true,
          },
        },
        maintenanceType: true,
      },
    });

    res.status(200).json(maintenance);
  } catch (error) {
    console.log(error);
  }
};
