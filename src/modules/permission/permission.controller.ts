import permissionModel from "../../DB/models/Permission.Model";
import userModel from "../../DB/models/User.Model";
import ErrorClass from "../../utils/ErrorClass";
import { asyncHandler } from "../../utils/errorHandling";
import { getOneById } from "../../utils/user";

export const getAllPermissions = asyncHandler(async (req, res, next) => {
  const permissions = await permissionModel.find({});
  return res
    .status(200)
    .json({ success: true, message: "Done", results: permissions });
});

export const getPermissionById = getOneById(permissionModel);

export const addNewPermission = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user?._id;

  //create Post
  const Permission = await permissionModel.create(req.body);
  return res
    .status(201)
    .json({ success: true, message: "Done", results: Permission });
});

export const updatePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const isExistPermission = await permissionModel.findById(id);
  if (!isExistPermission)
    return next(new ErrorClass("This Permission Is Not Exist", 404));

  //check Is Authurazition or not to do call this endpoint (owner only do that)
  if (isExistPermission.createdBy.toString() !== req.user?._id.toString())
    return next(new ErrorClass("Not Auth To update This Post", 401));

  const post = await permissionModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res
    .status(200)
    .json({ success: true, message: "Done", results: post });
});

export const deletePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const isExistPermission = await permissionModel.findById(id);
  if (!isExistPermission)
    return next(new ErrorClass("This Permission Is Not Exist", 404));
  if (isExistPermission.createdBy.toString() !== req.user?._id.toString())
    return next(new ErrorClass("Not Auth To Delete This Permission", 401));

  await permissionModel.findByIdAndDelete(id);
  return res
    .status(204)
    .json({ success: true, message: "Deleted Successfully" });
});

export const updateRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (id === req.user?._id.toString()) {
    return next(new ErrorClass("Cannot Assign A Role To Yourself", 403));
  }
  const isExistUser = await userModel.findById(id);
  if (!isExistUser) return next(new ErrorClass("This User Is Not Exist", 404));

  const user = await userModel.findByIdAndUpdate(
    id,
    {
      role: req.body.role,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Done", results: user });
});

export const assignPermissions = asyncHandler(async (req, res, next) => {
  const { userId, permissionId } = req.body;
  console.log(userId, permissionId);

  if (userId === req.user?._id.toString()) {
    return next(new ErrorClass("Cannot Assign A Permission To Yourself", 403));
  }

  const isExistUser = await userModel.findById(userId);
  if (!isExistUser) return next(new ErrorClass("This User Is Not Exist", 404));

  const isExistPermission = await permissionModel.findById(permissionId);
  if (!isExistPermission)
    return next(new ErrorClass("This Permission Is Not Exist", 404));

  const user = await userModel.findByIdAndUpdate(
    userId,
    {
      $addToSet: { permissions: isExistPermission.name },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Done", results: user });
});
