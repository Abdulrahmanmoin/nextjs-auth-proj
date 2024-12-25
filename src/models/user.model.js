import { model, models, Schema } from "mongoose";

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timeStamps: true }
);

export const User = models.users || model("users", userSchema)