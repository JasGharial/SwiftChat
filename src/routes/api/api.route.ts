import router, { Router } from "express";
import v1Routes from "./v1";

const apiRoutes: Router = router();

apiRoutes.use("/v1", v1Routes);

export default apiRoutes;