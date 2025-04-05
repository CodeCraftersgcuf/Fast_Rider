import { apiCall } from "../customApiCall";
import { API_ENDPOINTS } from "../../../apiConfig";





export const loginUser = async (
  data: {}
): Promise<IUserLoginResponse> => {
  console.log("🔹 Sending Login Request:", data); // ✅ Log request before sending
  return await apiCall(API_ENDPOINTS.AUTH.Login, "POST", data);
};

export const signUpUser = async (data: {}): Promise<any> => {
  console.log("🔹 Sending Register Request:", data); // ✅ Log request before sending
  return await apiCall(API_ENDPOINTS.AUTH.Register, "POST", data);
};



export const verifyEmailOTP = async (data: { otp: string; email: string }) => {
  return await apiCall(API_ENDPOINTS.AUTH.VerfiyEmailOtp, "POST", data);
};

export const resendOtp = async ({ data }: { data: { email: string } }) => {
  return await apiCall(API_ENDPOINTS.AUTH.ResendOtp, "POST", data);
};

export const setPin = async (data: { email: string; pin: string }) => {
  return await apiCall(API_ENDPOINTS.USER.SetPin, "POST", data);
};

export const verifyPin = async (data: { email: string; pin: string }) => {
  return await apiCall(API_ENDPOINTS.USER.VerifyPin, "POST", data);
};

export const forgotPassword = async (data: { email: string }) => {
  return await apiCall(API_ENDPOINTS.AUTH.ForgotPassword, "POST", data);
};
export const verifyPasswordOTP = async (data: {
  otp: string;
  email: string;
}) => {
  console.log("🔹 Sending Login Request:", data);
  return await apiCall(API_ENDPOINTS.AUTH.VerifyPasswordOtp, "POST", data);
};

export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  return await apiCall(API_ENDPOINTS.AUTH.ResetPassword, "POST", data);
};




export interface IUserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
  created_at: string;
  updated_at: string;
}

interface IUserLoginResponse {
  message: string;
  user: IUserProfile;
  token: string;
  status: string;
}
