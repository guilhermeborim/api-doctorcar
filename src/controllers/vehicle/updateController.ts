import { ObjectId } from "bson";
import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const updateVehicle = async (req: Request, res: Response) => {
  const { dailyMileage, brandId, model, licensePlate, year, kilometersDriven, stateVehicleId } = req.body;

  const userId = req.tokenData.id;

  if (!ObjectId.isValid(userId as string)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate },
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: 'Veículo não existe' });
    }

    if (existingVehicle.ownerId !== userId) {
      return res.status(401).json({ message: 'Voce não tem permissão para editar esse Veículo' });
    }

    const vehicle = await prisma.vehicle.update({
      where: { licensePlate },
      data: {
        dailyMileage,
        brandId,
        model,
        year,
        kilometersDriven,
        stateVehicleId,
      },
    });

    res.status(200).json(vehicle)
  } catch (error) {
    console.log(error);
  }
}