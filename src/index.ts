import 'module-alias/register';
import app from "@/config/application";
import sequelize from "@/config/db/connection";
import dotenv from "dotenv";

dotenv.config();

import { normalizePort, onError } from "./utils/server.utils";

import { ErrorRequestHandler } from "express";

const PORT = normalizePort(process.env.PORT || '3000');

const inVariable: ErrorRequestHandler = (err, req, res, next) => onError(err, PORT)

app.use(inVariable);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error: ErrorRequestHandler) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
});
