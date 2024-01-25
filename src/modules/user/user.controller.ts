
import  CryptoJS  from "crypto-js"
import { asyncHandler } from "../../utils/errorHandling";
import { deleteOneById, getOneById } from "../../utils/user";
import userModel from "../../DB/models/User.Model";
import { compare, hash } from "../../utils/hashAndCompare";
import ErrorClass from "../../utils/ErrorClass";
import { Request } from "express";



  //Only Admin Has Access
  export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userModel.find({})
    return res.status(200).json({ message: "Done", users });
  });

  //Both user-admins has access
  export const getUserById = getOneById(userModel);


  export const getLoggedInUser = asyncHandler(async (req, res, next) => {
    const userProfile = await userModel.findById(req.user?._id);
    return res.status(200).json({ message: "Done", userProfile });
  });
  
  export const updateProfile = asyncHandler(async (req, res, next) => {
    // const { firstName,lastName, age, phone } = req.body;

    const userToUpdate = await userModel.findByIdAndUpdate(
      req.user?._id,
      { ...req.body},
      { new: true }
    );
    return res.status(200).json({success:true, message: "Done", userToUpdate });
  });

  //Only Admins
  export const softDelete = asyncHandler(async (req, res, next) => {
    const {id} = req.body

    const userToDelete = await userModel.findByIdAndUpdate(id, { isDeleted: true });

    if(!userToDelete) return next(new ErrorClass("This User is Not Exist", 404));

    return res.status(200).json({success:true , message: "Done" });
  });


  export const deleteFromDatabase = deleteOneById(userModel)

