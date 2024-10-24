import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp'; // Import Sharp for image processing
import {
 getAllProducts,
 updateProduct,
 deleteProduct,
 postProduct, // Ensure this is the imported controller function
 getOneProduct,
 searchProducts
} from '../controllers/productsControllers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productRouter = express.Router();

// Configure Multer storage
const storage = multer.memoryStorage(); // Use memory storage to process images in memory
const upload = multer({ storage: storage });

// Route for getting and posting products
productRouter
 .route('/product')
 .get(getAllProducts)
 .post(upload.array('files', 10), async (req, res) => {
  try {
   const productData = req.body; // Get other product data from the request body
   const imagePaths = []; // Array to store paths of processed images

   // Process each uploaded file
   await Promise.all(
    req.files.map(async (file) => {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
     const outputFilePath = path.join(__dirname, '../uploads', `${uniqueSuffix}${path.extname(file.originalname)}`);

     // Process the image using Sharp
     await sharp(file.buffer)
      .resize(800) // Resize image to a max width of 800px
      .jpeg({ quality: 70 }) // Compress to 70% quality
      .toFile(outputFilePath); // Save processed image

     imagePaths.push(outputFilePath); // Add the path to the array
    })
   );

   // Now you can save the product along with the image paths to your database
   // Example: await Product.create({ ...productData, images: imagePaths });

   // Call the original postProduct controller if needed
   await postProduct({ body: productData, images: imagePaths }, res); // Adjust this call based on your implementation

   res.status(201).json({ message: 'Product created successfully', imagePaths });
  } catch (error) {
   console.error('Error processing images:', error);
   res.status(500).json({ error: 'Failed to process images' });
  }
 });

productRouter.route('/product/:id').patch(updateProduct).delete(deleteProduct).get(getOneProduct);

productRouter.get('/search', searchProducts);

export default productRouter;
