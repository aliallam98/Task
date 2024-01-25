import { NextFunction, Request, Response } from "express";
import joi from "joi";
import  { Types } from "mongoose";
const dataMethods = ["body", "params", "query", "headers", "file", "files"];

const validateObjectId = (value:any, helper:any) => {
  // console.log({ value });
  // console.log(helper);
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid objectId");
};


export const generalFields = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi.string(),
  // @ts-ignore
  cPassword: joi.string().required(joi.ref("password")),
  id: joi.string().custom(validateObjectId).required(),
  name: joi.string().required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  })
};

export const validation = (schema:any) => {
  return (req:Request,res:Response,next:NextFunction) => {
    const validationErr : any = [];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        // @ts-ignore
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErr.push(validationResult.error.details);
        }
      }
    });

    if (validationErr.length) {
      let {errors} = validationErr[0]
      // console.log(validationErr[0][0].message);
      return res.status(422).json({ message: "Validation Err", validationErr });
    }
    return next();
  };
};
