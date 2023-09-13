// Modules

import Job from "./job.model";
import APIFeatures from "../utils/apiFeatures";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

// Alias Middleware

export const wantedJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query.limit = "5";
  req.query.fields = "title,salary.value";
  req.query.sort = "-salary.value";
  next();
};

// Handlers

export const getAllJobs = catchAsync(async (req, res, next) => {
  const feats = new APIFeatures(Job.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .fieldsSelect();

  const jobs = await feats.query;
  res.status(200).json({
    status: "Success",
    results: jobs.length,
    data: jobs,
  });
});

export const getJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const feats = new APIFeatures(
    Job.findById(id),
    req.query
  ).fieldsSelect();

  const job = await feats.query;

  if (!job) return next(new AppError("Error 404 Job Isn't Found", 404));

  res.status(200).json({
    status: "Success",
    data: job,
  });
});

export const getJobStats = catchAsync(async (req, res, next) => {
  const job = await Job.aggregate([
    {
      $group: {
        _id: "$education_level",
        totalSalary: { $sum: "$salary.value" },
        minSalary: { $min: "$salary.value" },
        maxSalary: { $max: "$salary.value" },
        avgSalary: { $avg: "$salary.value" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: job,
  });
});

export const createJob = catchAsync(async (req, res, next) => {
  const body = req.body;
  const newJob = await Job.create(body);

  res.status(201).json({
    status: "Success",
    data: newJob,
  });
});

export const updateJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) return next(new AppError("Error 404 Job Isn't Found", 404));

  res.status(200).json({
    status: "Success",
    data: job,
  });
});

export const deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  if (!job) return next(new AppError("Error 404 Job Isn't Found", 404));

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
