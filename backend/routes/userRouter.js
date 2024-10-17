import express from "express";
import { signUp, signIn, signOut } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/logout").post(signOut);
export default userRouter;
