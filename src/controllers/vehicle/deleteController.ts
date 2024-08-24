import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.tokenData.id;

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
    });
    if (!vehicle) {
      return res.status(400).json({ message: "Veículo não encontrado" });
    }

    if (vehicle.ownerId !== userId) {
      return res.status(401).json({ message: "Você não tem permissão para deletar este veículo" });
    }

    // Deletar as manutenções relacionadas ao veículo
    await prisma.maintenance.deleteMany({
      where: {
        vehicleId: id,
      },
    });

    await prisma.vehicle.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Veículo deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Este veiculo ja foi deletado" });
  }
}