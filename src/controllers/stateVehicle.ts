import { prismaClient } from "../prisma";
import { VehicleStateCreateProps } from "../types";

const create = async (name: string) => {
  console.log(name);
  try {
    const row = await prismaClient.vehicleState.create({
      data: {
        name: name,
      },
    });
    console.log(row);
    return row;
  } catch (error) {
    return error;
  }
};

const returnAll = async () => {
  try {
    const rows = await prismaClient.vehicleState.findMany({});
    return { rows };
  } catch (error) {
    return error;
  }
};

export { create, returnAll };
