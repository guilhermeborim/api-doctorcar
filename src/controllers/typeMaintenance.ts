import { pool } from "../config/database";
import { MaintenanceTypeProps } from "../types";

const create = async (maintenanceType: MaintenanceTypeProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "maintenance_type" ("name", "benefits", "icon") VALUES ('${maintenanceType.name}', '{${maintenanceType.benefits}}', '${maintenanceType.icon}')`,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

export { create };
