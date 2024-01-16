import { Router } from "express";
import { loginUser, signupUser } from "../controller/userAuth";

const userRouter = Router();
userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
export { userRouter };
