import { signUpValidation } from "../middlewares/validator.js";
import { doHash, doHashValidate } from "../utils/hashing.js";
import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

///SIGH-UP///
export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
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
        .status(200)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await doHash(password, 12);
    const newUser = new User({ email, password: hashedPassword, name });
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
