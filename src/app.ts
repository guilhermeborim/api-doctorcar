import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/index";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

AppDataSource.initialize().then(async () => {
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3333");
  });
});
