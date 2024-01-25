import joi from "joi";
import { generalFields } from "../../middleware/validation";


export const getProfileById = {
  body: joi.object().required().keys(),
  file: generalFields.file,
  params: joi.object().required().keys({ id: generalFields.id }),
  query: joi.object().required().keys(),
};
export const updateProfile = {
  body: joi.object().required().keys({
    firstName:joi.string(),
    lastName:joi.string(),
    age:joi.string(),
    phone:joi.string()
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};

