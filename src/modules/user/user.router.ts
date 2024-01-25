import { Router } from "express";
import * as userController from "./user.controller";
import { auth } from "../../middleware/auth";
import { endpoint } from "./user.endpoint";
import { validation } from "../../middleware/validation";
import * as userValidators from "./user.validators";

const router = Router();



router.get("/",auth(endpoint.admins),userController.getAllUsers);  
router.get("/profile",auth(endpoint.both),userController.getLoggedInUser);
router.get("/:id",validation(userValidators.getProfileById),userController.getUserById);


router.put("/update",auth(endpoint.both),validation(userValidators.updateProfile),userController.updateProfile);
router.patch("/delete",auth(endpoint.admins),userController.softDelete); // can send id in params if needs 
router.delete("/:id",auth(endpoint.admins),validation(userValidators.getProfileById),userController.deleteFromDatabase); 




  






export default router;