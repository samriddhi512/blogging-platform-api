import { Request, Response, NextFunction } from "express";
import { ICustomError } from "../types/error.types";
import { STATUS } from "../constants/status";
import { HTTP_CODE } from "../constants/httpCodes";

function sendErrorProd(err: ICustomError, req: Request, res: Response) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
    status: HTTP_CODE.INTERNAL_SERVER_ERROR,
    message: "something went wrong",
  });
}

function sendErrorDev(err: ICustomError, req: Request, res: Response) {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

export function errorController(
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  err.status = err.status || STATUS.FAIL;
  err.statusCode = err.statusCode || HTTP_CODE.INTERNAL_SERVER_ERROR;

  if (process.env.ENV === "development") {
    sendErrorDev(err, req, res);
  } else sendErrorProd(err, req, res);
}
