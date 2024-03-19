import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class CustomError extends Error {
  statusCode: number | 500;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new CustomError("Not Authenticated", 401);
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, "supersecretsignature");
  } catch (err) {
    (err as any).statusCode = 500;
    return next(err);
  }

  if (!decodedToken) {
    const error = new CustomError("Not Authenticated", 401);
    return next(error);
  }
  next();
};

export default authMiddleware;
