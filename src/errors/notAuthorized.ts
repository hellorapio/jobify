import BaseError from "./baseError";

class NotAuthorized extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default NotAuthorized;
