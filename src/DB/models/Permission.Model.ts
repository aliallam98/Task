import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IPost extends Document {
    _id:string
    name: string;
    description: Types.ObjectId;
    createdBy:string
}
const permissionSchema = new Schema(
  {
    name: String,   
    description: String ,
    createdBy:{type:Types.ObjectId,ref:"User"}
  },
  {
    timestamps: true,
    strict: true,
  }
);

const permissionModel = model<IPost>("Permission", permissionSchema);

export default permissionModel;
