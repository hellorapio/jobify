import CompanyValidator from "./company.validator";
import CompanyService from "./company.service";
import sendRes from "../../utils/sendResponse";
import { Request, Response } from "express";

class CompanyController {
  static async addCompany(req: Request, res: Response) {
    const body = await CompanyValidator.createCompany(req.body);
    const company = await CompanyService.createCompany(req.user.id, body);
    sendRes(res, 201, company);
  }

  static async updateCompany(req: Request, res: Response) {
    const body = await CompanyValidator.updateCompany(req.body);
    const company = await CompanyService.updateCompany(req.user.id, body);
    sendRes(res, 200, company);
  }
}

export default CompanyController;
