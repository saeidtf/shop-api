import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import routers from "./routers";
import { sequelize } from "./lib/database/sequelize";
import { Role } from "./models";
import { migrate } from "./lib/database/Seed";

dotenv.config();

const port = process.env.PORT || 3500;

const app: Application = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

routers(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

(async () => {
  await sequelize.sync({ force: true });
  await migrate();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
