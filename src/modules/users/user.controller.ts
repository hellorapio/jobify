import { Request, Response } from "express";
import User from "./user.model";
import Company from "../companies/company.model";
import Worker from "../workers/worker.model";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: users,
  });
};

export const deleteMe = async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "Success",
  });
};

export default { deleteMe, getAllUsers };

// exports.createUser = (req, res) => {};
// exports.updateUser = (req, res) => {};
// exports.deleteUser = (req, res) => {};
// export const getUser = (req, res) => {};
