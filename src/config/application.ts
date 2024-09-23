// Server Dependencies
import express, { Request, Response } from "express";
import cors from "cors";
import { errors } from "celebrate";

// Logger
import morgan from "morgan";

// Middlewares & Error Handling
import { ensureJsonContentType } from "./middlewares/request";
import { errorHandler } from "./middlewares/handlers/error.handlers";

// Routes
import apiRoutes from "./routes/api/api.route";

const app = express();

app.use(cors({
  origin: [process.env.ORIGIN || 'http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}))

morgan.token('body', (req: express.Request) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :body :response-time ms', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stdout
}));
app.use(morgan(':method :url :status :body :response-time ms', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stderr
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ensureJsonContentType, apiRoutes);

app.use(errors());

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;