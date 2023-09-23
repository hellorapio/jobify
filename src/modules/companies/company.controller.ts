import validationCatch from "../../utils/validationCatch";
import companyValidator from "./company.validator";
import CompanyService from "./company.service";
import sendRes from "../../utils/sendRes";
import { Request, Response } from "express";

const addCompany = async (req: Request, res: Response) => {
  const companyBody = await validationCatch(
    companyValidator.createCompany,
    req.body
  );
  const company = await CompanyService.addCompany(
    req.user.id,
    companyBody
  );

  sendRes(res, 201, company);
};

const updateCompany = async (req: Request, res: Response) => {
  const body = await validationCatch(
    companyValidator.updateCompany,
    req.body
  );
  const company = await CompanyService
  sendRes(res, 200, company);
};

export default { addCompany, updateCompany };
