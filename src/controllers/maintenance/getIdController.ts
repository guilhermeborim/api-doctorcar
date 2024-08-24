import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const getMaintenanceId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vehicleId = await prisma.vehicle.findUnique({
      where: { id: id },
    });
    if (!vehicleId) {
      return res.status(404).json({ message: "Este veículo nao existe" });
    }

    const maintenance = await prisma.maintenance.findMany({
      where: {
        vehicleId: id,
      },
      include: {
        vehicle: true,
        maintenanceType: true,
      },
    });
    res.status(200).json(maintenance);
  } catch (error) {
    console.log(error);
  }
};
