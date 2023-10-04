import NotFound from "../errors/notFound";
import errorHandler from "./../middlewares/error.middleware";
import jobRouter from "../modules/jobs/job.routes";
import applicantRouter from "../modules/applicants/applicant.routes";
import userRouter from "../modules/users/user.routes";
import authRouter from "../modules/auth/auth.routes";
import companyRouter from "../modules/companies/company.routes";
import workerRouter from "../modules/workers/worker.routes";
import reviewRouter from "../modules/reviews/review.routes";
import { Express } from "express";

const addRoutes = (app: Express) => {
  app.use("/api/v1/applicants", applicantRouter);
  app.use("/api/v1/companies", companyRouter);
  app.use("/api/v1/jobs", jobRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/workers", workerRouter);

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "Server is Live",
    });
  });

  app.all("*", (req, res) => {
    throw new NotFound(`Can't find any routes on ${req.originalUrl}`);
  });

  app.use(errorHandler);
};

export default addRoutes;
