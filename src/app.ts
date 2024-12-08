import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server connection has been established successfully.", PORT);
});