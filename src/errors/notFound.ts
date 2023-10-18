import BaseError from "../bases/base.error";

class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFound;
