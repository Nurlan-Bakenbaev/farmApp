import express from "express";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  postProduct,
  getOneProduct,
} from "../controllers/productsControllers.js";
const productRouter = express.Router();

productRouter.route("/product").get(getAllProducts).post(postProduct);
productRouter
  .route("/product/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getOneProduct);
export default productRouter;
