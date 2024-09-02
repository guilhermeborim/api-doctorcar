import { pool } from "../config/database";
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

export { create };
