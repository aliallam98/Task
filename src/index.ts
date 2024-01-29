import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import adminRouter from "./modules/permission/permission.router";
import postRouter from "./modules/post/post.router";
import connectToDB from "./DB/connection";
import { globalErrorHandling } from "./utils/errorHandling";
dotenv.config();

const app: Application = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (_, res: Response) => res.json({ message: "Home Page" }));
app.use(`/auth`, authRouter);
app.use(`/user`, userRouter);
app.use(`/admin`, adminRouter);
app.use(`/post`, postRouter);
app.all("*", (_, res: Response) => {
  res.send("In-valid Routing Please Check Url Or Method");
});

app.use(globalErrorHandling);
connectToDB();

app.listen(port, () => console.log(`Server Is On Listening ...... ${port}`));
