import { NextFunction, Response, Request } from "express";
import User from "../modules/user/model/user.model";
import jwt from "../utils/jwt";
import NotAuthorized from "../errors/notAuthorized";

const protect = async (req: Request, _: Response, next: NextFunction) => {
  // 1) Getting the Token

  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    throw new NotAuthorized("You are not Logged in, Please Log in");

  // 2) Verifying the Token if exists

  const { iat, id }: any = await jwt.verify(token);

  // 3) Does the user Exists ?

  const user = await User.findById(id).select(
    "+passwordChangeDate +lastLogout +isVerified"
  );

  if (!user) throw new NotAuthorized("User Doesn't Exist please Signup");

  // 4) Did user reset his pass or logout ?

  if ((await user.changedPassword(iat)) || (await user.logout(iat)))
    throw new NotAuthorized(
      "Your password has been changed or you have logged out lately"
    );

  // 5) Check if the user is Verified or not
  
  if (!user.isVerified)
    throw new NotAuthorized("Your Email is not Verified");

  // Access GRANTED HAPPY HACKING <3
  req.user = user;
  next();
};

export default protect;
