import { prismaClient } from "../prisma";
import { BrandCreateProps } from "../types";

const create = async (brand: BrandCreateProps) => {
  try {
    const row = await prismaClient.brand.create({
      data: {
        name: brand.name,
        description: brand.description,
        logo: brand.logo,
      },
    });

    return row;
  } catch (error) {
    return error;
  }
};

const returnAll = async () => {
  try {
    const row = await prismaClient.brand.findMany({});

    return row;
  } catch (error) {
    return error;
  }
};

export { create, returnAll };
