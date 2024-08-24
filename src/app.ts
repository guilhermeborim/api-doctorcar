import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import routes from "../src/routes/index";
import swaggerDocs from "./swagger.json";
import cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);
// Routes
// app.use("/user", routesUser);
// app.use("/vehicle", routerVehicle);
// app.use("/brand", routerBrand);
// app.use("/maintenance", routerMaintenance);
// app.use("/maintenance-type", routerMaintenanceType);
// app.use("/state-vehicle", routerStateVehicle);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3333");
});
