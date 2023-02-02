import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import path from "path";
import routers from "./routers";

dotenv.config();

const app: Application = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(express.static(path.join(__dirname, "public")));

routers(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;
