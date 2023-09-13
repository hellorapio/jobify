import catchAsync from "../utils/catchAsync";

export const company = catchAsync(async (req, res, next) => {
  req.body.role = "company";
  next();
});

export const worker = catchAsync(async (req, res, next) => {
  req.body.role = "worker";
  next();
});
