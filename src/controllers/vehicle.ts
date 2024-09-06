import { pool } from "../config/database";
import { AppError } from "../errors/error";
import { VehicleProps } from "../types";

const create = async (vehicle: VehicleProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "vehicle" ("model", "licensePlate", "year", "kilometersDriven", "dailyMileage", "brandId", "ownerId", "stateVehicleId")
        VALUES ('${vehicle.model}', '${vehicle.licensePlate}', '${vehicle.year}', '${vehicle.kilometersDriven}', '${vehicle.dailyMileage}',
        '${vehicle.brand}', '${vehicle.owner}', '${vehicle.stateVehicle}')
      `,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const get = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM "vehicle"`);
    if (rows.length === 0) {
      throw new AppError("Não existe Veículos", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const update = async (vehicle: VehicleProps) => {
  try {
    const fieldsToUpdate: string[] = [];
    const values = [];

    Object.entries(vehicle).forEach(([key, value]) => {
      if (value !== undefined && key !== "id") {
        fieldsToUpdate.push(`"${key}" = $${fieldsToUpdate.length + 1}`);
        values.push(value);
      }
    });

    if (fieldsToUpdate.length === 0) {
      throw new AppError("No fields provided to update.");
    }

    values.push(vehicle.id);

    const rows = await pool.query(
      `UPDATE "vehicle" SET ${fieldsToUpdate.join(", ")} WHERE "id" = $${values.length}`,
      values,
    );

    if (rows.rowCount === 0) {
      throw new AppError("Veículo não encontrado", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const deletar = async (id: string) => {
  try {
    await pool.query(`DELETE FROM "maintenance" WHERE "vehicleId" = '${id}'`);
    const rows = await pool.query(`DELETE FROM "vehicle" WHERE "id" = '${id}'`);

    if (rows.rowCount === 0) {
      throw new AppError("Veículo não encontrado", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const checkLicensePlateExists = async (licensePlate: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT "licensePlate" FROM "vehicle" WHERE "licensePlate" = '${licensePlate}'`,
    );

    if (rows.length === 0) {
      return false;
    }
    return rows;
  } catch (error) {
    return error;
  }
};
export { checkLicensePlateExists, create, deletar, get, update };
