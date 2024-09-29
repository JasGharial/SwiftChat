// Dependencies
import router, { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
// Controller Actions
import { Create, Login, currentUser, updateProfile } from "@/controllers/auth";
// Middlewares
import { validateJwtToken } from "@/config/middlewares/auth";

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
}), Login);

authRouter.get("/user-info", validateJwtToken, currentUser);

authRouter.post("/update-profile", validateJwtToken, celebrate({
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    color: Joi.number().required()
  })
}), updateProfile);

export default authRouter;