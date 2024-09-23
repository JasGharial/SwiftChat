import router, { Router } from "express";
import { Create, Login } from "../../../../controllers/auth";
import { celebrate, Joi, Segments } from "celebrate";
import apiRoutes from "../../api.route";

const authRouter: Router = router();

authRouter.post("/register", celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(8),
    confirm_password: Joi.ref("password")
  })
}), Create);

authRouter.post("/login", celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(8)
  })
}), Login)

export default authRouter;