import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds: number = parseInt(process.env.SALTROUNDS as string, 10) || 10;
const jwtSecret = process.env.JWTSECRET || "";
const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const createJwt = (id: string) => {
  const token = jwt.sign({ _id: id }, jwtSecret, {
    expiresIn: "24h",
  });
  return token;
};

export { hashPassword, comparePassword, createJwt };
