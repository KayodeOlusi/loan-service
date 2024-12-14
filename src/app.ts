import dotenv from "dotenv";
import cors from "cors";
import dbSync from "./utils/db.sync";
import { buildAppRoutes } from "./api/routes/initializer";
import reqLogger from "./api/middlewares/req.middleware";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(reqLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbSync.migrate();
buildAppRoutes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server connection has been established successfully.", PORT);
});