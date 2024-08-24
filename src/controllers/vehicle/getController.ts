import { ObjectId } from "bson";
import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const getVehicle = async (req: Request, res: Response) => {
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

    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: userId },
      include: {
        brand: true,
        maintenances: true,
        stateVehicle: true,
      }
    });

    if (vehicles === null || vehicles.length === 0) {
      res.status(400).json({ message: "Nenhum veículo encontrado" });
    }
    res.status(200).json(vehicles);
  } catch (error) { }
}