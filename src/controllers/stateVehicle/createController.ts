import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const createStateVehicle = async (req: Request, res: Response) => {
  const {name} = req.body

  try {
    const stateVehicle = await prisma.vehicleState.create({
      data: {
        name
      }
    })

    res.json(stateVehicle)  
  } catch (error) {
    console.log(error)
  }
}