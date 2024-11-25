import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import routes from "../src/routes/index";
import cookieParser from "cookie-parser";
dotenv.config();

export const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);
