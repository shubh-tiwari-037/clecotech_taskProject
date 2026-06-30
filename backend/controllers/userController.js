import { Error } from "mongoose";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import generateaccessAndrefreshToken from "./refreshaccessToken.js";

export const register = async (req, res) => {
  console.log("Register API Hit");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existsuser = await User.findOne({ email });

    if (existsuser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const { accessToken, refreshToken } =
      generateaccessAndrefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    console.log("before seeting coockies", accessToken, refreshToken);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Login Successful",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
      console.log("cookies set successfully");
      
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  console.log("Logout Controller Hit");
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: null,
        },
      },
      {
        new: true,
      },
    );

    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        message: "Logout Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "Admin" },
    }).select("-password");

    return res.status(200).json({
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "Admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    // const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid User",
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }

    const { accessToken } = generateaccessAndrefreshToken(user);

    return res.status(200).json({
      message: "Access Token Refreshed",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Refresh Token Expired",
    });
  }
};


export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  register,
  login,
  logout,
  deleteUser,
  getUserById,
  allUsers,
  refreshAccessToken,
  getMe
};
