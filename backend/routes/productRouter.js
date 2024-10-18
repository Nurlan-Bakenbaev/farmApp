import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  postProduct,
  getOneProduct,
} from "../controllers/productsControllers.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productRouter = express.Router();

// Set up multer storage configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Specify the directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
  },
});
const upload = multer({ storage: storage });
productRouter
  .route("/product")
  .get(getAllProducts)
  .post(upload.array("files", 10), postProduct);
productRouter
  .route("/product/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getOneProduct);
export default productRouter;
