import { Router } from "express";

const router = Router();

import { userRouter } from "./user.routes";

router.use("/user", userRouter);

export default router;
