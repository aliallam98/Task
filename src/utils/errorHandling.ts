
import { Request, Response, NextFunction } from "express";
import ErrorClass from "./ErrorClass";


interface RequestHandler<T> {
    (req: Request, res: Response, next: NextFunction): Promise<T>;
  }
  
  export const asyncHandler = <T>(fn: RequestHandler<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res, next).catch((error: ErrorClass) => { // Declare error as ErrorClass
        next(new ErrorClass(error.message, error.status || 500));
      });
    };
  };
  
  export const globalErrorHandling = (error: ErrorClass, req: Request, res: Response, next: NextFunction) => { // Expect ErrorClass
    return res.status(error.status || 400).json({ message: error.message, stack: error.stack });
  };