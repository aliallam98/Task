

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

export const roles = {
    superAdmin:"Super-Admin",
    admin : "Admin",
    user : "User"
}

export const auth = (roles: string[] = []) =>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {

            const {authorization} = req.headers
            if(!authorization?.startsWith(process.env.BEARER_KEY as string)){
                return next(new ErrorClass("Authorization Is Required" , 401))
            }
            const token = authorization.split(process.env.BEARER_KEY as string)[1]
            if(!token){
                return next(new ErrorClass("token Is Required", 401))
            }
            const decoded :any = verifyToken({token})
            if(!decoded?.id){
                return next(new ErrorClass("Invaild Payload Data" , 401))
            }

            const user : IUser | null = await userModel.findById(decoded.id)
            if(!user){
                return next(new ErrorClass("Not Registered Account", 404))
            }
            if(!roles.includes(user.role)){
                return next(new ErrorClass("you are Unauthorized ", 401))
            }
            req.user = user
            next()
    
        } catch (error:any) {
        return res.json({ message: "Catch error" , err:error?.message })
            
        }
    }
}

