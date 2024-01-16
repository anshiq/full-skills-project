import { Request, Response } from "express";
import { User } from "../models/userSchema";
import {
  comparePassword,
  createJwt,
  hashPassword,
} from "../Others/AuthFuntions";
async function signupUser(req: Request, res: Response) {
  try {
    const { name, email, password, mobile } = req.body;
    const hashedpassword = await hashPassword(password);
    const data = await User.create({
      name,
      email,
      password: hashedpassword,
      mobile,
    });
    res.json({ success: true, data: data });
  } catch (error) {
    res.json({ success: false, err: JSON.stringify({ error: error }) });
    console.log(error);
  }
  return;
}
async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email: email });
    if (data) {
      const isUser = await comparePassword(password, data.password);
      if (isUser) {
        const token = createJwt(data._id.toString());
        res.json({ success: true, data: { token: token } });
      } else {
        res.json({ success: false, err: "Wrong Credentials" });
      }
    }
  } catch (error) {
    res.json({ success: false, err: JSON.stringify({ error: error }) });
    console.log(error);
  }

  return res.json();
}
async function forgotPassword(req: Request, res: Response) {}
export { signupUser, forgotPassword, loginUser };
