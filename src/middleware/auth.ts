import { NextFunction, Request, Response } from "express";
import userModel, { IUser } from "../DB/models/User.Model";
import ErrorClass from "../utils/ErrorClass";
import { verifyToken } from "../utils/generateAndVerifyToken";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const AvalibleRoles = {
  superAdmin: "Super-Admin",
  admin: "Admin",
  user: "User",
};

export const auth = (roles: string[] = [], permissions: string = "") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.BEARER_KEY as string)) {
        return next(new ErrorClass("Authorization Is Required", 401));
      }
      const token = authorization.split(process.env.BEARER_KEY as string)[1];
      if (!token) {
        return next(new ErrorClass("token Is Required", 401));
      }
      const decoded: any = verifyToken({ token });
      if (!decoded?.id) {
        return next(new ErrorClass("Invaild Payload Data", 401));
      }

      const user: IUser | null = await userModel.findById(decoded.id);
      if (!user) {
        return next(new ErrorClass("Not Registered Account", 404));
      }




      console.log(roles.length > 0 && !roles.includes(user.role));
      console.log(user.permissions.includes(permissions));
      
      if (
        (roles.length > 0 && !roles.includes(user.role)) &&
        (permissions.length > 0 &&
          !user.permissions.includes(permissions))
      ) {
        return next(new ErrorClass("You are Unauthorized", 401));
      }
      req.user = user;
      next();
    } catch (error: any) {
      return res.json({ message: "Catch error", err: error?.message });
    }
  };
};
