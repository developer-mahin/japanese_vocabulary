import express from "express";
import auth from "../../middleware/auth";
import { AuthController } from "./authy.controller";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.get("/verify/:token", AuthController.verifyUser);
router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/change-password", auth(), AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
