import { Router } from "express";
import * as pValidators from "./permission.validators";
import * as pController from "./permission.controller";
import { auth } from "../../middleware/auth";
import { validation } from "../../middleware/validation";
import { endpoint, permissions } from "./permission.endpoint";

const router = Router();



router
  .route("/")
  .get(auth(endpoint.superAdmin, permissions.canGetAll),pController.getAllPermissions)
  .post(
    auth(endpoint.superAdmin),
    // validation(pController.createNewPost),
    pController.addNewPermission
  );

  router
  .route("/permissions")
  .put(auth(endpoint.superAdmin),pController.assignPermissions)


router
  .route("/:id")
  .get(
    // validation(pController.getPostById), 
    auth(endpoint.superAdmin),
    pController.getPermissionById)
  .put(
    auth(endpoint.superAdmin),
    // validation(pController.updatePermission),
    pController.updatePermission
  )
  .patch(
    auth(endpoint.superAdmin),
    // validation(pController.updatePermission),
    pController.updateRole
  )
  .delete(
    auth(endpoint.superAdmin),
    validation(pController.deletePermission),
    pController.deletePermission
  );




export default router;