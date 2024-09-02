import { pool } from "../config/database";
import { VehicleStateProps } from "../types";

const create = async (vehicleState: VehicleStateProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "vehicle_state" ("name") VALUES('${vehicleState}')`,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const get = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM "vehicle_state"`);
    return { rows };
  } catch (error) {
    return error;
  }
};

export { create, get };
