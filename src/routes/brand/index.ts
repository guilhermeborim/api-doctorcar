import { Router } from "express";
import { createBrand } from "../../controllers/brand/createController";

const brandRouter = Router();

brandRouter.post("/create", createBrand);

export default brandRouter;
