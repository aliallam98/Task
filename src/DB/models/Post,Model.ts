import mongoose, { Schema, model, Types, Document } from "mongoose";


export interface IPost extends Document {
  content: string;
  createdBy: Types.ObjectId;

}
const postSchema = new Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    strict:true
  }
);


const postModel = model<IPost>("Post", postSchema);


export default postModel;
