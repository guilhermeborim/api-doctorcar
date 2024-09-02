import { pool } from "../config/database";
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
    const rows = await pool.query(
      `SELECT * FROM "vehicle" AS "v" LEFT JOIN "user" ON "v"."ownerId" = "user"."id"`,
    );
    return rows.rows;
  } catch (error) {
    return error;
  }
};
export { create, get };
