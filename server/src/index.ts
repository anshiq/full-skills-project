import express, { Express } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { connect_db } from "./db/connect";
dotenv.config();
const port: string | number = process.env.PORT || 8080;
const uri: string = process.env.MONGOURI || "";
const app: Express = express();
app.use(express.json());
app.use("/user", userRouter);
const start = () => {
  try {
    connect_db(uri);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
