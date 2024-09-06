import { pool } from "../config/database";
import { AppError } from "../errors/error";
import { MaintenanceProps } from "../types";

const create = async (maintenance: MaintenanceProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "maintenance" ("kilometersAtService", "kilometersNextService", "dateOfService",
        "serviceCoast", "vehicleId", "maintenanceTypeId")
        VALUES ('${maintenance.kilometersAtService}', '${maintenance.kilometersNextService}', '${maintenance.dateOfService}',
        '${maintenance.serviceCoast}', '${maintenance.vehicle}', '${maintenance.maintenanceType}')
      `,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const get = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM "maintenance" LEFT JOIN "vehicle" ON "maintenance"."vehicleId" = "vehicle"."id"
       LEFT JOIN "maintenance_type" ON "maintenance"."maintenanceTypeId" = "maintenance_type"."id"`,
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
      `SELECT * FROM "maintenance" LEFT JOIN "vehicle" ON "maintenance"."vehicleId" = "vehicle"."id"
       LEFT JOIN "maintenance_type" ON "maintenance"."maintenanceTypeId" = "maintenance_type"."id"
       WHERE "vehicle"."id" = '${id}'`,
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
      `SELECT "id" FROM "vehicle" WHERE "id" = '${id}'`,
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
