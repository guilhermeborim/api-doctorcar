import { ObjectId } from "bson";
import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const createMaintenance = async (req: Request, res: Response) => {

  const { vehicleId, kilometersAtService, kilometersNextService, dateOfService, serviceCoast, maintenanceTypeId } = req.body;

  const userId = req.tokenData.id;

  if (!ObjectId.isValid(vehicleId as string) || !ObjectId.isValid(maintenanceTypeId as string)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }

  try {

    const formattedDateOfService = new Date(dateOfService).toISOString().split('T')[0] + 'T00:00:00.000Z';

    const vehicleUserId = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    if (!vehicleUserId) {
      return res.status(404).json({ message: 'Veículo nao existe' });
    }
    if (vehicleUserId.ownerId !== userId) {
      return res.status(401).json({ message: 'Você não tem permissão para criar manutenção para este veículo' });
    }
    const maintenanceType = await prisma.maintenanceType.findUnique({
      where: { id: maintenanceTypeId }
    });
    if (!maintenanceType) {
      return res.status(404).json({ message: 'O tipo de manutenção nao existe' });
    }

    const maintenance = await prisma.maintenance.create({
      data: {
        vehicleId,
        kilometersAtService,
        kilometersNextService,
        dateOfService: formattedDateOfService,
        serviceCoast,
        maintenanceTypeId,
      },
      include: {
        vehicle: true,
        maintenanceType: true
      }
    })
    res.status(201).json(maintenance);
  } catch (error) {
    console.log(error);
  }
}