import { Router } from "express";
import * as postValidators from "./Posts.validators";
import * as postController from "./post.controller";
import { endpoint } from "./Posts.endpoint";
import { auth } from "../../middleware/auth";
import { validation } from "../../middleware/validation";

const router = Router();



router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    auth(endpoint.both),
    validation(postValidators.createNewPost),
    postController.addNewPost
  );

router
  .route("/:id")
  .get(validation(postValidators.getPostById), postController.getPostById)
  .put(
    auth(endpoint.both),
    validation(postValidators.updatePost),
    postController.updatePost
  )
  .delete(
    auth(endpoint.both),
    validation(postValidators.deletePost),
    postController.deletePost
  );


export default router;