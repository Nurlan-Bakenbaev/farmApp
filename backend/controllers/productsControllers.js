import Product from "../models/product.model.js";

export const postProduct = async (req, res) => {
  const product = req.body;
  console.log(product);
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
  }); // Include image in the product object

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
    res.json({ success: true, quantity: products.length,  products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
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
