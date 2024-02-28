import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: String = req.body.email;
  const password: String = req.body.password;
  
  let existUser;
  try {
    existUser = await User.findOne({ email: email });
    if (!existUser) {
      throw new CustomError("This email is not registered", 404);
    }
  } catch (error) {
    
    return next(error);
  }

  let comparePassword = await bcrypt.compare(password, existUser.password);
  try {
    if (!comparePassword) {
      throw new CustomError("This Password is Invalid", 404);
    }
  } catch (error) {
   
    return next(error);
  }

  try {
    const token = jwt.sign(
      {
        email: existUser.email,
        
        userId: existUser._id.toString(),
      },
      "supersecretsignature",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
      email: existUser.email,
      name:existUser.name,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name: String = req.body.name;
  const email: String = req.body.email;
  const dob: String = req.body.dob;
  const password: String = req.body.password;
  const confirmPassword: String = req.body.confirmPassword;
 
  const userType = "user";
  try {
    if (password.length <= 5) {
      throw new CustomError(
        "Password should have more than 8 characters",
        400
      );
    } else {
      let existingUserCount = await User.countDocuments({ email: email });
      if (existingUserCount !== 0) {
        throw new CustomError("User with this email already exists", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = new User({
        name: name,
        email: email,
        dob: dob,
        password: hashedPassword,
        userType: userType,
      });
      const savedUser = await user.save();
      res.status(201).json({
        message: "user Created",
        details: savedUser,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
