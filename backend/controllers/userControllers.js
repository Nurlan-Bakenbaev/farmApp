import { signUpValidation } from '../middlewares/validator.js';
import { doHash, doHashValidate } from '../utils/hashing.js';
import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';

///SIGH-UP///
export const signUp = async (req, res) => {
 const { email, password, name } = req.body;
 const photo = req.file;
 try {
  const { error, value } = signUpValidation.validate({ email, password });
  if (error) {
   return res.status(401).json({ success: false, message: error.details[0].message });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
   return res.status(409).json({ success: false, message: 'User already exists!' });
  }
  const hashedPassword = await doHash(password, 12);
  const photoPath = photo ? photo.path : null;
  const newUser = new User({
   email,
   password: hashedPassword,
   name,
   photo: photoPath
  });
  const result = await newUser.save();
  result.password = undefined;
  res.status(201).json({
   success: true,
   message: 'A new account has been created!',
   user: result
  });
 } catch (error) {
  res.status(404).json({ message: 'An error has occurred', error: error });
 }
};

export const signIn = async (req, res) => {
 const { email, password } = req.body;

 try {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
   return res.status(404).json({ success: false, message: 'User not found' });
  }
  const isMatch = await doHashValidate(password, user.password);
  if (!isMatch) {
   return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = jwt.sign(
   {
    userId: user.id,
    email: user.email,
    verified: user.verified
   },
   process.env.JWT_SECRET,
   { expiresIn: '8h' }
  );

  return res
   .cookie('Authorization', 'Bearer ' + token, {
    expires: new Date(Date.now() + 8 * 3600000),
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
   })
   .status(200)
   .json({
    success: true,
    user,
    token: token,
    message: 'Logged in successfully'
   });
 } catch (error) {
  console.error('SignIn Error: ', error);
  return res.status(500).json({
   success: false,
   message: 'An error has occurred while signing in',
   error: error.message
  });
 }
};

export const signOut = (req, res) => {
 res.clearCookie('Authorization');
 res.status(200).json({ success: true, message: 'Logged out successfully' });
};


export const getUserById = async (req, res) => {
 const { id } = req.params;
 try {
  const user = await User.findById(id).populate('products').select('-password');
  if (!user) {
   return res.status(404).json({ success: false, message: 'User not found' });
  }
  return res.status(200).json({
   success: true,
   user
  });
 } catch (error) {
  222;
  return res.status(500).json({
   success: false,
   message: error.message
  });
 }
};

export const toggleLikeProduct = async (req, res) => {
 const { userId, productId } = req.params;
 try {
  const user = await User.findById(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }
  const hasLiked = user.likedProducts.includes(productId);

  let updatedUser;

  if (hasLiked) {
   updatedUser = await User.findByIdAndUpdate(userId, { $pull: { likedProducts: productId } }, { new: true });
  } else {
   updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { likedProducts: productId } }, { new: true });
  }
  return res.status(200).json(updatedUser);
 } catch (error) {
  console.error(error.message);
  return res.status(500).json({ message: error.message });
 }
};
