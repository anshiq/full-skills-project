import { Router } from "express";
import { codeCompile, getUserDetails } from "../controller/authedController";
const authRouter = Router();
authRouter.route("/api").get(getUserDetails);
authRouter.route("/compile").post(codeCompile);
export { authRouter };
