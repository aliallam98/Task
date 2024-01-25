import { Router } from "express";
import * as authController from "./auth.controller";
import * as authValidators from "./auth.validators";
import { validation } from "../../middleware/validation";
import { endpoint } from "../user/user.endpoint";
import { auth } from "../../middleware/auth";
const router = Router();





router.post("/sign-up",validation(authValidators.signUp),authController.signUP)

router.patch("/confirm-email",validation(authValidators.confirmUser),authController.confirmUserEmail);

router.post("/log-in", validation(authValidators.logIn), authController.logIn);


router.patch("/change-password",auth(endpoint.user),validation(authValidators.changePassword),authController.changePassword);

router.post("/forget-password",validation(authValidators.forgetPassword),authController.forgetPassword);

router.patch("/reset-password",validation(authValidators.resetPassword),authController.resetPassword);


export default router;
