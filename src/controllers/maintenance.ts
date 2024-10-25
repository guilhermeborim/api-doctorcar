import { pool } from "../config/database";
import { AppError } from "../errors/error";
import { MaintenanceProps } from "../types";

const create = async (maintenance: MaintenanceProps) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO "maintenance" ("kilometers_at_service", "kilometers_next_service", "date_of_service",
        "service_coast", "vehicle_id", "maintenance_type_id")
        VALUES ('${maintenance.kilometers_at_service}', '${maintenance.kilometers_next_service}', '${maintenance.date_of_service}',
        '${maintenance.service_coast}', '${maintenance.vehicle_id}', '${maintenance.maintenance_type_id}')
      `,
    );
    return rows[0];
  } catch (error) {
    return error;
  }
};

const get = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT "mn".*, "v"."model", "mt"."name"
       FROM "maintenance" "mn"
       LEFT JOIN "vehicle" "v" ON "mn"."vehicle_id" = "v"."id"
       LEFT JOIN "maintenance_type" "mt" ON "mn"."maintenance_type_id" = "mt"."id"`,
    );
    if (rows.length === 0) {
      throw new AppError("Nenhuma manutenção encontrada.", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT "mn".*, "v"."model", "mt"."name"
       FROM "maintenance" "mn"
       LEFT JOIN "vehicle" "v" ON "mn"."vehicle_id" = "v"."id"
       LEFT JOIN "maintenance_type" "mt" ON "mn"."maintenance_type_id" = "mt"."id"
      WHERE "mn"."idmaintenance" = '${id}'`,
    );
    if (rows.length === 0) {
      throw new AppError("Nenhuma manutenção encontrada.", 404);
    }
    return rows;
  } catch (error) {
    throw error;
  }
};
const checkVehicleExist = async (id: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT "idvehicle" FROM "vehicle" WHERE "idvehicle" = '${id}'`,
    );

    if (rows.length === 0) {
      return false;
    }
    return rows;
  } catch (error) {
    throw error;
  }
};
export { checkVehicleExist, create, get, getById };
