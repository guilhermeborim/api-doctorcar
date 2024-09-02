import { pool } from "../config/database";
import { BrandProps } from "../types";

const create = async (brand: BrandProps) => {
  try {
    const rows = await pool.query(
      `INSERT INTO "brand" ("name", "description", "logo") VALUES ('${brand.name}', '${brand.description}', '${brand.logo}')`,
    );
    return rows;
  } catch (error) {
    return error;
  }
};

export { create };
