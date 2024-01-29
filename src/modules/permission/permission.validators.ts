import joi from "joi";
import { generalFields } from "../../middleware/validation";

export const createNewPost = {
  body: joi.object().required().keys({
    content: generalFields.name,
    privacy:joi.string(),
  }),
  files:generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};
export const updatePost = {
    body: joi.object().required().keys({
        content: joi.string(),
        privacy:joi.string(),
      }),
      files: generalFields.file,
      params: joi.object().required().keys(
        {
            id:generalFields.id
        }
      ),
      query: joi.object().required().keys(),
};
export const deletePost = {
  body: joi.object().required().keys(),
  file: generalFields.file,
  params: joi.object().required().keys({ id: generalFields.id }),
  query: joi.object().required().keys(),
};
export const getPostById = {
  body: joi.object().required().keys(),
  file: generalFields.file,
  params: joi.object().required().keys({ id: generalFields.id }),
  query: joi.object().required().keys(),
};