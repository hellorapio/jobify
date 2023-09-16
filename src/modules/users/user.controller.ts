import { Request, Response } from "express";
import User from "../auth/user.model";
import Company from "../companies/company.model";
import Worker from "../workers/worker.model";

const objFiltering = (obj: {}, ...allowed: string[]) => {
  for (const iterator in obj)
    if (!allowed.includes(iterator)) delete obj[iterator as keyof {}];
  return obj;
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: users,
  });
};

export const workerUpdate = async (req: Request, res: Response) => {
  if (req.body.userId) delete req.body.userId;

  const worker = await Worker.findOneAndUpdate(
    { userId: req.user!.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    worker,
  });
};

export const companyUpdate = async (req: Request, res: Response) => {
  if (req.body.companyId) delete req.body.companyId;

  const company = await Company.findOneAndUpdate(
    { companyId: req.user!.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    company,
  });
};

export const deleteMe = async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.user!.id, { active: false });

  res.status(204).json({
    status: "Success",
  });
};

// exports.createUser = (req, res) => {};
// exports.updateUser = (req, res) => {};
// exports.deleteUser = (req, res) => {};
// export const getUser = (req, res) => {};
