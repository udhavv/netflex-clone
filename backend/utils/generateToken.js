import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 10000, //15 days in miliseconds
    httpOnly: true, // prevents  cross-site-scripting (XSS) attack and not accessable by JS
    sameSite: "strict",   //CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development"
  });
};
