import { STATUS } from "../constants/status";
import { ICustomError, ErrorStatusType } from "../types/error.types";

interface ICustomErrorArgs {
  message: string;
  statusCode: number;
}

export class CustomError extends Error implements ICustomError {
  isOperational: boolean;
  status: ErrorStatusType;
  statusCode: number;
  constructor({ message, statusCode }: ICustomErrorArgs) {
    super(message);

    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? STATUS.FAIL : STATUS.ERROR;

    Error.captureStackTrace(this, this.constructor);
  }
}
