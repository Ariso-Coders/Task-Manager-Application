import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import userRoutes from "./routes/user";

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorHandler = (
  error: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message || "This is error from backend";
  console.log("backend error",error)
  res.status(status).json({ message: message });
};

app.use(errorHandler);

try {
  mongoose.connect(
    "mongodb+srv://ariso_database:arisoIT123@clusterariso.2wgz0cy.mongodb.net/"
  );
  app.listen(8080, () => {
    console.log("connected to 8080");
  });
} catch (err) {
  console.log("mongoose error", err);
}
