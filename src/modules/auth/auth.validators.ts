import joi from "joi";
import { generalFields } from "../../middleware/validation";

export const signUp = {
  body: joi.object().required().keys({
    firstName: generalFields.name,
    lastName: generalFields.name,
    email:generalFields.email,
    password: joi.string().min(6).max(30).required(),
    phone:joi.string(),
    age:joi.number().positive().integer()
  }),
  files: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};
export const confirmUser = {
    body: joi.object().required().keys({
        email: generalFields.email,
        OTP:joi.string().required(),
      }),
      files: generalFields.file,
      params: joi.object().required().keys(),
      query: joi.object().required().keys(),
};
export const logIn = {
  body: joi.object().required().keys({
    email:generalFields.email,
    password:joi.string().required()
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};
export const changePassword = {
  body: joi.object().required().keys({
    oldPassword:joi.string().required(),
    newPassword:joi.string().min(6).max(30).required(),
    confirmNewPassword:joi.ref("newPassword")
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};
export const forgetPassword = {
  body: joi.object().required().keys({
    email:generalFields.email,
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};

export const resetPassword = {
  body: joi.object().required().keys({
    email:generalFields.email,
    OTP:joi.string().required(),
    newPassword:joi.string().min(6).max(30).required()
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};

