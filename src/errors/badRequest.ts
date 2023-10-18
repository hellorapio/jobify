import BaseError from "../bases/base.error";

class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequest;
