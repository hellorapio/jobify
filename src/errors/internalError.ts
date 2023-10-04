import BaseError from "./baseError";

class InternalError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

export default InternalError;
