  import userModel, { IUser } from "../../DB/models/User.Model";

  import ErrorClass from "../../utils/ErrorClass";
  import { asyncHandler } from "../../utils/errorHandling";
  import { generateToken } from "../../utils/generateAndVerifyToken";
  import { generateOTPWithExpireDate } from "../../utils/generateOTP";
  import { compare, hash } from "../../utils/hashAndCompare";
  import { createHTML, sendEmail } from "../../utils/mailSender";
  import { checkUserBasics } from "../../utils/user";


  export const signUP = asyncHandler(async (req, res, next) => {
      //Receive Data from body
    
      //Check ih this email existing in db or not
      const isEmailExist = await userModel.findOne({ email:req.body.email });
      if (isEmailExist)
        return next(new ErrorClass("This Email Already In Use", 409));
    
      //Hash Password
      req.body.password = hash({ plaintext: req.body.password });
      //Encrypt Phone
      if(req.body.phone){
        req.body.phone = CryptoJS.AES.encrypt(req.body.phone, process.env.CRYPTOKEY as string).toString();
      }
    
      //Send Confirmation Mail ////
    
      // Generate random number
      const OTP = generateOTPWithExpireDate(5);



      // Insert otp number into html page that will send by mail
      const html = createHTML(OTP.OTPCode);
      // sendEmail({to:email ,subject:"Confirmation Mail",text:"Please Click The Below Link To Confirm Your Email",html})
      if (
        !sendEmail({
          to: req.body.email,
          subject: "Confirmation Mail",
          text: "Please Click The Below Link To Confirm Your Email",
          html,
        })
      ) {
        return next(new ErrorClass("There is someting Wrong with Email Sender",400));
      }

      const newUser = await userModel.create({...req.body,OTP})
      return res.status(201).json({success:true, message: "User Has Created", results: newUser });
    });

    export const confirmUserEmail = asyncHandler(async (req, res, next) => {
      const { email, OTP } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new ErrorClass("This Email Is Not Exist", 404));
      }
      if (user.confirmEmail)
        return next(
          new ErrorClass(
            "This Email Already Confirmed ... Go To Login In Page", // res.redirect res. redirect()
            400
          )
        );
      if (user?.OTP?.OTPCode !== OTP) {
        return next(new ErrorClass("In Valid OTP", 400));
      }
      const newOTP = generateOTPWithExpireDate(0)
      const userToConfirm = await userModel.findOneAndUpdate(
        { email },
        { confirmEmail: true, OTP: newOTP },
        { new: true }
      );
      return res.status(201).json({success:true, message: "Done", results : userToConfirm });
    });

    export const logIn = asyncHandler(async (req, res, next) => {
      //Receive Data from body
      let { email, password } = req.body;
    
      //Check isEmailExist
      const isEmailExist = await userModel.findOne({ email });
      if (!isEmailExist)
        return next(new ErrorClass("Email Or Password Is Wrong", 401));
    
      //Check IsValidPassword
      const IsValidPassword = compare({
        plaintext: password,
        hashValue: isEmailExist.password,
      });
      if (!IsValidPassword)
        return next(new ErrorClass("Email Or Password Is Wrong", 401));
    
      //Check IsEmailConfirmed
      //Check isDeleted
      //Check Status
      checkUserBasics(isEmailExist, next);
    
      // General Payload and Token
      const payload = {
        id: isEmailExist._id,
        name: `${isEmailExist.firstName} ${isEmailExist.lastName}` ,
        email: isEmailExist.email,
      };
    
      const token = generateToken({ payload });
    
      const refreshToken = generateToken({ payload, expiresIn: 60 * 60 * 24 * 7 });


      // in case needs to use cookie
      res.cookie('token',refreshToken,{
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly:true,
        secure:true,
      })
    
      return res  
        .status(200)
        .json({ success:true , message: "Done", results: token });
    });


    export const changePassword = asyncHandler(async (req, res, next) => {
      let { oldPassword, newPassword } = req.body;
      const IsOldPasswordValid = compare({
        plaintext: oldPassword,
        hashValue: req.user?.password!,
      });
      if (!IsOldPasswordValid)
        return next(new ErrorClass("password is Wrong", 400));
    
      if (oldPassword == newPassword) {
        return next(
          new ErrorClass("Cannot Change New Password To Old Password", 409)
        );
      }
    
      newPassword = hash({ plaintext: newPassword });
    
      await userModel.findByIdAndUpdate(req.user?._id,{password: newPassword});
      return res.status(200).json({ message: "Password Changed" });
    });

    export const forgetPassword = asyncHandler(async (req, res, next) => {
      const { email } = req.body;
      //Check isEmailExist
      const isEmailExist = await userModel.findOne({ email });
      if (!isEmailExist) return next(new ErrorClass("Email Is Wrong", 404));
    
      //Check IsEmailConfirmed
      //Check isDeleted
      checkUserBasics(isEmailExist, next);
    
      if (isEmailExist.OTPNumber >= Number(process.env.MAXOTPSMS))
        return next(new ErrorClass("Already Sent Check Your Mail", 403));
    
      //Send OTP By NodeMailer
      const OTP = generateOTPWithExpireDate(5)
      if (
        !sendEmail({
          to: email,
          subject: "Forget Password Mail",
          text: `Your Password Reset Code Is :${OTP.OTPCode}`,
        })
      ) {
        return next(new ErrorClass("There is someting Wrong with Email Sender",400));
      }
    
      await userModel.findByIdAndUpdate(isEmailExist._id, {
        $inc: { OTPNumber: 1 },
        OTP
      });
      return res.status(200).json({success:true , message: "Check Your Email" });
    });

    export const resetPassword = asyncHandler(async (req, res, next) => {
      let { email, OTP, newPassword } = req.body;
      //Check isEmailExist
      const isEmailExist = await userModel.findOne({ email });
      if (!isEmailExist) return next(new ErrorClass("Email Is Wrong", 404));
      //Check OTP
      if (isEmailExist.OTP.OTPCode !== OTP)
        return next(new ErrorClass("In Vaild OTP", 400));
    
      newPassword = hash({ plaintext: newPassword });
      const newOTP = generateOTPWithExpireDate(0)
    
      await userModel.findOneAndUpdate(
        { email },
        { password: newPassword, OTP: newOTP, OTPNumber: 0 }
      );
    
      return res.status(200).json({ message: "Your New Password Has Set" });
    });