class AppError extends Error {
  status: string;
  isOperational: boolean;
  code?: number;
  path?: string;
  value?: string;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("5") ? "error" : "fail";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
