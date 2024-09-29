import router, { Router } from "express";
import authRouter from "./auth";

const v1Routes: Router = router();

v1Routes.use("/auth", authRouter);

export default v1Routes;