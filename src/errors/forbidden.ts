import BaseError from "./baseError";

class Forbidden extends BaseError {
  constructor() {
    super(
      "You don't have Permissions to perform any requests to this Route",
      403
    );
  }
}

export default Forbidden;
