import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectionDB } from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import multer from "multer";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/api", productRouter);
app.patch("/product/:id");
app.listen(process.env.PORT, connectionDB(process.env.MONGO_DB_URL), () => {
  console.log("Server is on");
});
