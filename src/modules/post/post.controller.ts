import postModel from "../../DB/models/Post,Model";
import ErrorClass from "../../utils/ErrorClass";
import { asyncHandler } from "../../utils/errorHandling";
import { getOneById } from "../../utils/user";





export const getAllPosts = asyncHandler(
    async (req, res, next) => {
      const posts = await postModel.find({})
      return res.status(200).json({success:true, message: "Done", results: posts });
    }
  );

  export const addNewPost = asyncHandler(async (req, res, next) => {
    //Handle createdby field in BD
    req.body.createdBy = req.user?._id;
  
    //create Post
    const post = await postModel.create(req.body);
    return res.status(201).json({sccess:true, message: "Done", results: post });
  });

  export const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const isExistPost = await postModel.findById(id);
    if (!isExistPost) return next(new ErrorClass("This Post Is Not Exist", 404));

    //check Is Authurazition or not to do call this endpoint (owner only do that)
    if(isExistPost.createdBy.toString() !== req.user?._id.toString())
     return next(new ErrorClass("Not Auth To update This Post", 401));
  
    const post = await postModel.findByIdAndUpdate(id,req.body,{new:true})
  
    return res.status(200).json({sccess:true, message: "Done", results:post });
  });


  export const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const isExistPost = await postModel.findById(id);
    if (!isExistPost) return next(new ErrorClass("This Post Is Not Exist", 404));
    if(isExistPost.createdBy.toString() !== req.user?._id.toString()) 
    return next(new ErrorClass("Not Auth To update This Post", 401));
  
     await postModel.findByIdAndDelete(id)
    return res.status(204).json({success:true, message: "Deleted Successfully" });
  });
  
  //Get Post By ID
  export const getPostById = getOneById(postModel);
  
  