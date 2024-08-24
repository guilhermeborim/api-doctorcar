import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { prisma } from '../../../prisma';


export const createVehicle = async (req: Request, res: Response) => {

  const { dailyMileage, brandId, model, licensePlate, year, kilometersDriven, stateVehicleId } = req.body;
  const userId = req.tokenData.id;

  if (!ObjectId.isValid(userId as string)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    // Verifica se a marca existe
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });
    if (!brand) {
      return res.status(404).json({ message: 'Marca não existe' });
    }

    const existingVehicle = await prisma.vehicle.findFirst({
      where: { licensePlate },
    });

    if (existingVehicle) {
      return res.status(400).json({ message: 'Essa placa já existe' });
    }

    // Cria o veículo
    const vehicle = await prisma.vehicle.create({
      data: {
        dailyMileage,
        brandId,
        model,
        licensePlate,
        year,
        kilometersDriven,
        stateVehicleId,
        ownerId: userId as string,
      },
      include: {
        brand: true,
        owner: true,
        stateVehicle: true,
        maintenances: true,
      },
    });
    res.status(201).json(vehicle);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      // Prisma unique constraint error
      res.status(400).json({ message: 'Essa placa já existe' });
    } else {
      res.status(500).json({ error: 'Failed to create vehicle' });
    }
  }
};
