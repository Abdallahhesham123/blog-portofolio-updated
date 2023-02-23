import UserModel from "../../../../DB/model/User.model.js";
import jwt from "jsonwebtoken";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import * as dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};

export const register = async (req, res, next) => {
  try {
    const { username, password, email, confirm_pass } = req.body;
    if (password != confirm_pass) {
      return res
        .status(404)
        .json({ message: "Password and comfirm password do not match" });
    }
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res
        .status(404)
        .json({ message: "Email Exist Please chose another Email" });
    }

    const passwordHash = hash({ plaintext: password });
    await UserModel.create({
      username,
      email,
      password: passwordHash,
    });
    return res
      .status(200)
      .json({ message: "Successfully Register Please Logged In " });
  } catch (err) {
    return res.status(404).json({ message: "Catch Error", err });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    const checkPassword = compare({
      plaintext: req.body.password,
      hashValue: user.password,
    });

    if (!checkPassword) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },

      JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    return res.status(200).json({ message: "Successfully Logged In", token });
  } catch (err) {
    return res.status(404).json({ message: "Catch Error", err });
  }
};
export const resetpassword = async (req, res, next) => {
  try {
    const { oldpassword, password, confirm_pass } = req.body;

    if (password != confirm_pass) {
      return res
        .status(404)
        .json({ message: "Password and comfirm password do not match" });
    }

    const checkUser = await UserModel.findById(req.user.id);
   
    if (!checkUser) {
      return res
        .status(404)
        .json({ message: "This User Isnot Exist in database" });
    } else {
      const checkPassword = compare({
        plaintext: oldpassword,
        hashValue: checkUser.password,
      });
      if (!checkPassword) {
        return res
          .status(404)
          .json({ message: "password isnot exist in database" });
      }
    }
    const passwordHash = hash({ plaintext: password });
    await UserModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );
    return res
      .status(200)
      .json({ message: "Congratulation ,Your Password Changed " });
  } catch (err) {
    return res.status(404).json({ message: "Catch Error", err });
  }
};
