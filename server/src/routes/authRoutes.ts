import { Router } from "express";
import { loginUser, signupUser } from "../controller/userAuth";

const authRouter = Router();
authRouter.route("/api").get((req,res)=>{
    res.send("Hello");
});
export { authRouter };