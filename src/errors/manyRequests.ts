import BaseError from "../bases/base.error";

class ManyRequests extends BaseError {
  constructor(message: string) {
    super(message, 429);
  }
}

export default ManyRequests;
