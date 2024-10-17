import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    photo: String,
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, maxlength: 1000 },
    category: String,
    quantity: Number,
    minOrder: String,
    stock: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productsSchema);
export default Product;
