import { Request, Response } from 'express';
import { prisma } from "../../../prisma";

export const createBrand = async (req: Request, res: Response) => {

  const { name, logo, description } = req.body;

  try {
    const newBrand = await prisma.brand.create({
      data: {
        name,
        logo,
        description,
      },
    });

    res.status(201).json({
      message: 'Brand criada com sucesso', brand: newBrand,
    });
  } catch (error: any) {
    console.error(error.message);
  }
};
