import { pool } from "../config/database";

const store = async (user: { name: string; email: string }) => {
  try {
    const rows = await pool
      .query(
        `INSERT INTO "user" ("name", "email","createdAt", "updatedAt")
          VALUES('${user.name}', '${user.email}', NOW(), NOW())`,
      )
      .catch((error: any) => {
        console.log(error);
      });
    return rows;
  } catch (error) {
    return error;
  }
};

export { store };
