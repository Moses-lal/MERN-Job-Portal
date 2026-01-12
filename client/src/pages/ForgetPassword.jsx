import React from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import api from "../config/api";


const ForgetPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = React.useState("");
  const [isOTPsent, setIsOTPSent] = React.useState(false);

  const [otp, setOTP] = React.useState("");
  const [isOTPVerified, setIsOTPVerified] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setEmail("");
    setOTP("");
    setConfirmNewPassword("");
    setNewPassword("");
    setIsOTPSent(false);
    setIsOTPVerified(false);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isOTPsent) {
      try {
        //call Backend_API to sendOTP
        const res = await api.post("/auth/fp/sendOTP", { email });
        toast.success(res.data.message);
        setIsOTPSent(true);
        return;
      } catch (error) {
        console.log(error);
        toast.error(
          `Error : ${error.response?.status} | ${error.response?.data?.message}`
        );
        return;
      } finally {
        setLoading(false);
      }
    } else if (!isOTPVerified) {
      try {
        //call Backend_API to verify OTP
        const res = await api.post("/auth/fp/verifyOTP", { email, otp });
        toast.success("OTP Verified Successfully");
        setIsOTPVerified(true);
        return;
      } catch (error) {
        console.log(error);
        toast.error(
          `Error : ${error.response?.status} | ${error.response?.data?.message}`
        );
        return;
      } finally {
        setLoading(false);
      }
    } else {
      try {
        //call Backend_API to reset password
        if (newPassword !== confirmNewPassword) {
          toast.error("Password Mismatch");
          setLoading(false);
          return;
        }

        const res = await api.post("/auth/forgetPassword", {
          email,
          newPassword,
        });
        toast.success(res.data.message);
        handleClose();
        return;
      } catch (error) {
        console.log(error);
        toast.error(
          `Error : ${error.response?.status} | ${error.response?.data?.message}`
        );
        return;
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md">
        <div className="bg-gray-200 w-lg p-3">
          {/* Modal Header */}
          <div className="flex justify-between border-b-2 pb-2">
            <h1 className="text-lg">Forget Password</h1>
            <button className="text-2xl" onClick={handleClose}>
              <IoIosCloseCircle />
            </button>
          </div>

          {/* Modal body */}
          <div>
            {/* Email, OTP, NewPassword , confirm NewPassword */}
            <div>
              <label className="block mb-2 mt-4">Email</label>
              <input
                type="email"
                className="border p-2 w-full disabled:cursor-not-allowed"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isOTPsent}
              />

              {isOTPsent && (
                <>
                  <label className="block mb-2 mt-4">OTP</label>
                  <input
                    type="text"
                    className="border p-2 w-full disabled:cursor-not-allowed"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    disabled={isOTPVerified}
                  />
                </>
              )}

              {isOTPVerified && (
                <>
                  <label className="block mb-2 mt-4">New Password</label>
                  <input
                    type="password"
                    className="border p-2 w-full"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label className="block mb-2 mt-4">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="border p-2 w-full"
                    placeholder="Confirm your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 "
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2  "
                  onClick={handleSubmit}
                >
                  {loading
                    ? "Loading.."
                    : isOTPsent
                    ? isOTPVerified
                      ? "Reset Passowrd"
                      : "Verify OTP"
                    : "Send OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
