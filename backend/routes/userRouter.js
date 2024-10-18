import express from "express";
import multer from "multer";
import path from "path";

import { signUp, signIn, signOut } from "../controllers/userControllers.js";
const userRouter = express.Router();

// Define storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
  }
  cb(null, true);
};
export const upload = multer({ storage, fileFilter });

userRouter.route("/signup").post(upload.single("photo"), signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/logout").post(signOut);
export default userRouter;
