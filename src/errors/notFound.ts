import BaseError from "./baseError";

class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFound;
