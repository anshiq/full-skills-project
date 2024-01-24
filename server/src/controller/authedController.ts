import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { exeCpp } from "../compiler/cpp_compiler";
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.userId);
    if (!data) return;
    const user = {
      success: true,
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
      },
    };
    res.json(user);
  } catch (error) {
    res.json({ success: false, data: { msg: JSON.stringify({ err: error }) } });
  }
};
const codeCompile = async (req: Request, res: Response) => {
  const { lang, code, input } = req.body;

  if (lang === "cpp") {
    try {
      const { result } = await exeCpp(code, input);
      res.json({ res: result });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
};
export { getUserDetails, codeCompile };
