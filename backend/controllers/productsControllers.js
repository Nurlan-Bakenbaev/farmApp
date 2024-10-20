import path from "path";
import Product from "../models/product.model.js";
import { fileURLToPath } from "url";
import fs from "fs/promises";

//POST PRODUCT
export const postProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const imagePaths = req.files.map((file) => file.path);
  const newProduct = new Product({
    ...product,
    user: product.userId,
    image: imagePaths,
  });

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//GET ONE PRODUCT
export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await Product.findById(id);
    res.status(200).json({ success: true, data: singleProduct });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, quantity: products.length, products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// DELETE PRODUCT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID to get image paths
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.image && product.image.length > 0) {
      await Promise.all(
        product.image.map(async (imagePath) => {
          const fullImagePath = path.isAbsolute(imagePath)
            ? imagePath
            : path.join(__dirname, "..", imagePath);
          try {
            await fs.access(fullImagePath);
            await fs.unlink(fullImagePath);
          } catch (err) {
            res.status(500).json(err);
          }
        })
      );
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product and associated images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, img } = req.body.product;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        img,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
