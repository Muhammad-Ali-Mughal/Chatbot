import User from "../models/User.model.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error, cause: error.message });
  }
};

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const registeredUser = await User.findOne({ email: email });
    if (registeredUser)
      return res.status(400).json({ message: "User is already registered." });
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // creating token and storing cookie

    // removing past cookie if exists
    res.clearCookie("auth_token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(
      registeredUser._id.toString(),
      registeredUser.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: "OK", savedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, cause: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ email: email });
    if (!registeredUser) {
      return res.status(400).json({ message: "No such user is registered." });
    }
    const isMatched = await compare(password, registeredUser.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ message: "Please provide the correct password." });
    }

    // creating token and storing cookie

    res.clearCookie("auth_token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(
      registeredUser._id.toString(),
      registeredUser.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "Logged in succesfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, cause: error.message });
  }
};
