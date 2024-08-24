import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const createMaintenanceType = async (req: Request, res: Response) => {
  const { name, benefits, icon } = req.body;

  try {
    const maintenanceType = await prisma.maintenanceType.create({
      data: {
        name,
        benefits,
        icon,
      }
    });

    return res.status(201).json(maintenanceType);
  } catch (error) {
    console.log(error);
  }
}