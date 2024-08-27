import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";

import { conectarServerDB } from "./config/db";

export const app = express();

app.use(cors());
app.use(bodyParser.json());

const AtualizarBanco = async () => {
  await conectarServerDB();
};

AtualizarBanco();
