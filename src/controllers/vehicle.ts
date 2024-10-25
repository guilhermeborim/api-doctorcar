import { pool } from "../config/database";
import { AppError } from "../errors/error";
import { VehicleProps } from "../types";

const create = async (vehicle: VehicleProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "vehicle" ("model", "license_plate", "year", "kilometers_driven", "daily_mileage", "brand_id", "owner_id", "state_vehicle_id")
        VALUES ('${vehicle.model}', '${vehicle.license_plate}', '${vehicle.year}', '${vehicle.kilometers_driven}', '${vehicle.daily_mileage}',
        '${vehicle.brand_id}', '${vehicle.owner_id}', '${vehicle.state_vehicle_id}')
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
    await pool.query(`DELETE FROM "maintenance" WHERE "vehicle_id" = '${id}'`);
    const rows = await pool.query(`DELETE FROM "vehicle" WHERE "id" = '${id}'`);

    if (rows.rowCount === 0) {
      throw new AppError("Veículo não encontrado", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const checkLicensePlateExists = async (license_plate: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT "license_plate" FROM "vehicle" WHERE "license_plate" = '${license_plate}'`,
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
