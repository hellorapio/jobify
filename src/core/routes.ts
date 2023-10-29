import NotFound from "../errors/notFound";
import errorHandler from "./../middlewares/error.middleware";
import jobRouter from "../modules/job/job.routes";
import applicantRouter from "../modules/applicant/applicant.routes";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.routes";
// import reviewRouter from "../modules/review/review.routes";
import { Express } from "express";

const addRoutes = (app: Express) => {
  app.use("/api/v1/applicants", applicantRouter);
  app.use("/api/v1/jobs", jobRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  // app.use("/api/v1/reviews", reviewRouter);

  app.get("/health", (_, res) => {
    res.status(200).json({
      status: "Server is Live",
    });
  });

  app.all("*", (req, _) => {
    throw new NotFound(`Can't find any routes on ${req.originalUrl}`);
  });

  app.use(errorHandler);
};

export default addRoutes;
