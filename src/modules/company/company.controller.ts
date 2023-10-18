import companyValidator from "./company.validator";
import companyService from "./company.service";
import sendRes from "../../utils/sendResponse";
import { Request, Response } from "express";
import BaseController from "../../bases/base.controller";
import { ICompany } from "./model/company.interface";

class CompanyController extends BaseController<ICompany> {
  constructor() {
    super(companyService, companyValidator);
  }

  // static async addCompany(req: Request, res: Response) {
  //   const body = await CompanyValidator.createCompany(req.body);
  //   const company = await CompanyService.createCompany(req.user.id, body);
  //   sendRes(res, 201, company);
  // }

  async updateCompany(req: Request, res: Response) {
    const body = await this.validator.update(req.body);
    const company = await this.service.update(req.user.id, body);
    sendRes(res, 200, company);
  }
}

export default CompanyController.getInstance();
