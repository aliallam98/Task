import mongoose, { Schema, model, Types, Document } from "mongoose";



export interface IUser extends Document {
  _id:string
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  confirmEmail: boolean;
  isDeleted: boolean;
  role: "User" | "Admin" | "Super-Admin";
  OTP: {OTPCode:string, expireDate:Date}; // Optional field
  OTPNumber: number;

}

const userSchema = new Schema(
  {
    firstName:  { type: String, required: true } ,
    lastName:  { type: String, required: true } ,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    age: Number,
    confirmEmail: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      enum: ["User","Admin","Super-Admin"],
      default: "User",
    },
    OTP: {OTPCode:String,expireDate:Date},
    OTPNumber: {
      type: Number,
      default: 0,
    },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
    strict:true
  }
);


const userModel = model<IUser>("User", userSchema);

export default userModel;
