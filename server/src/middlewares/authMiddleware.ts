import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface DecodedToken {
  _id: string;
  [key: string]: any;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
const jwtSecret = "secret";
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export { verifyToken };
