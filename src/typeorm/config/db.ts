import "dotenv/config";
import { join } from "path";
import { DataSource } from "typeorm";

export const conectarServerDB = async () => {
  const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: true,
    entities: [join(__dirname, "../entity/*.ts")],
    migrations: [join(__dirname, "../migration/*.ts")],
    subscribers: [],
  });

  try {
    await PostgresDataSource.initialize();
    await PostgresDataSource.runMigrations();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await PostgresDataSource.destroy();
    console.log("Conexão com o banco de dados fechada.");
    process.exit(0);
  }
};
