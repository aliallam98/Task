import otpGenerator from "otp-generator";
import moment from "moment";

export const generateOTP = () => {
  const OTP = {
    OTPCode: otpGenerator.generate(Number(process.env.OTPNUMBERS), {
      upperCaseAlphabets: false,
      specialChars: false,
    }),
  };
  return OTP;
};
export const generateOTPWithExpireDate = (n:Number) => {
  const OTP = {
    OTPCode: otpGenerator.generate(Number(process.env.OTPNUMBERS), {
      upperCaseAlphabets: false,
      specialChars: false,
    }),
    expireDate: moment().add(Number(n), "minutes"),
  };
  return OTP;
};
