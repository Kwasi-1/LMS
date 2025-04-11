import { NextFunction, Request, Response } from "express"

export const errorHandler = (message: string, statusCode: number) => {
  const error = new Error();
  (error as any).statusCode = statusCode;
  error.message = message;

  return error
}

