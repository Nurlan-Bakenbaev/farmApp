import { signUpValidation } from "../middlewares/validator.js";
import { doHash, doHashValidate } from "../utils/hashing.js";
import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

///SIGH-UP///
export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const photo = req.file;
  try {
    const { error, value } = signUpValidation.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await doHash(password, 12);
    const photoPath = photo ? photo.path : null;
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      photo: photoPath,
    });
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "A new account has been created!",
      user: result,
    });
  } catch (error) {
    res.status(404).json({ message: "An error has occurred", error: error });
  }
};

/// SIGH-IN ///
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate password
    const isMatch = await doHashValidate(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create a token
    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      "Application-TEST-TOKEN",
      { expiresIn: "8h" }
    );

    return res
      .cookie("Authorization", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      })
      .status(200)
      .json({
        success: true,
        user: {
          name: existingUser.name,
          email: existingUser.email,
          userId: existingUser.id,
        },
        token: token,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.error("SignIn Error: ", error);
    return res.status(500).json({
      success: false,
      message: "An error has occurred while signing in",
      error: error.message,
    });
  }
};

export const signOut = (req, res) => {
  res.clearCookie("Authorization");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("products")
      .select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//User Like unLike Product
export const toggleLikeProduct = async (userId, productId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const hasLiked = user.liked.includes(productId);

    let updatedUser;

    if (hasLiked) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { liked: productId } },
        { new: true }
      ).populate("liked");
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { liked: productId } },
        { new: true }
      ).populate("liked");
    }
    return updatedUser;
  } catch (error) {
    console.error(error.message);
    res.status(404).json(error.message);
  }
};
