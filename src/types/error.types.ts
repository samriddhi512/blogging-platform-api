import { STATUS } from "../constants/status";

export type ErrorStatusType = typeof STATUS.FAIL | typeof STATUS.ERROR;

export interface ICustomError extends Error {
  isOperational: boolean;
  statusCode: number;
  status: ErrorStatusType;
}
