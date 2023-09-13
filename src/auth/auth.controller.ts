import catchAsync from "../utils/catchAsync";
import AuthService from "./auth.service";
import createSendToken from "../utils/createSendToken";
import authValidator from "./auth.validator";
import validationCatch from "../utils/validationCatch";

export const signup = catchAsync(async (req, res) => {
  const validatedUser = await validationCatch(
    authValidator.signup,
    req.body
  );
  const user = await AuthService.signup(validatedUser);
  // user.password = undefined;
  createSendToken(user, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const validatedUser = await validationCatch(
    authValidator.login,
    req.body
  );
  const user = await AuthService.login(validatedUser);
  createSendToken(user, 200, res);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = await validationCatch(
    authValidator.forgotPassword,
    req.body
  );
  await AuthService.forgotPassword(email, req.protocol, req.get("host")!);

  res.status(200).json({
    status: "Success",
    message: "Reset Link has been Sent to the Email",
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const reset = await validationCatch(authValidator.resetPassword, {
    token: req.params.token,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const user = await AuthService.resetPassword(reset);
  createSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res) => {
  const validatedPasswords = await validationCatch(
    authValidator.updatePassword,
    {
      currentPassword: req.body.currentPassword,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    }
  );
  const user = await AuthService.updatePassword(
    req.user.id,
    validatedPasswords
  );
  createSendToken(user, 200, res);
});

export const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.user.id);

  // Cookie Reset for JWT
  res.cookie("jwt", "");
  res.status(200).json({
    status: "Success",
  });
});
