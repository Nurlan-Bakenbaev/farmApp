import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    image: [{ type: String }],
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, maxlength: 1000 },
    category: String,
    quantity: String,
    minOrder: String,
    telephone: Number,
    address: String,
    delivery: Boolean,
    bio: Boolean,
    username: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productsSchema);
export default Product;
