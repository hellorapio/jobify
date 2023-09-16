import catchAsync from "../../utils/catchAsync";
import validationCatch from "../../utils/validationCatch";
import companyValidator from "./company.validator";
import CompanyService from "./company.service";
import sendRes from "../../utils/sendRes";

const addCompany = catchAsync(async (req, res) => {
  const companyBody = await validationCatch(
    companyValidator.createCompany,
    req.body
  );
  const company = await CompanyService.addCompany(
    req.user.id,
    companyBody
  );

  sendRes(res, 201, company);
});

const updateCompany = catchAsync(async (req, res) => {});

export default { addCompany, updateCompany };
