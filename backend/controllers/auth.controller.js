import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt= await bcrypt.genSalt(8)

    const hashedPassword= await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(newUser._id, res)
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "user created successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in signup", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password}= req.body;
    
    if ( !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }
  
    const user = await User.findOne({ email });
    if (!user){
        return res.status(404).json({success: false, message: 'Invalid credentials'})
    }

    const isPasswordCorrect= await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect){
        return res.status(404).json({success: false, message: 'Invalid credentials'})
    }

    generateTokenAndSetCookie(user._id, res)

    
    res.status(200).json({
        success: true,
        message: "login successfully",
        user: {
          ...user._doc,
          password: "",
        },
      });
  } catch (error) {
    console.log("error in login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({success: true, message: 'Log out success'})
  } catch (error) {
    console.log('Error in logout controller', error.message)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
};




export const authCheck= async (req, res) => {
  try{

    res.status(200).json({success: true, user: req.user})
  } catch(error){
    colsole.log('Error in authCheck controller', error.message)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
}