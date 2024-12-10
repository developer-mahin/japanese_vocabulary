import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../Interfaces/errorSource";
import handleZodError from "../errors/handleZodError";
import config from "../../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;

  let message = error.message || "Something went wrong!";
  let errorDetails: TErrorSources = [
    {
      field: "",
      message: message,
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorSources;
  }

  if (error.statusCode === 403 || error.statusCode === 401) {
    errorDetails = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: config.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
