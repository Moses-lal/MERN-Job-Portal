import React from "react";
import { useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import ForgetPassword from "./ForgetPassword";

const Login = () => {
  const { setuser, setIsLogin, setIsRecruiter } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  const [loading, setloading] = useState(false);

  const handlechange = (e) => {
    // const Name = e.target.name;
    // const Value = e.target.value;

    const { name, value } = e.target;

    setLoginData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(loginData);
    setloading(true);

    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message);
      sessionStorage.setItem("userData", JSON.stringify(res.data.data));
      setIsLogin(true);
      setuser(res.data.data);
      res.data.data.role === "recruiter" && setIsRecruiter(true);
      setLoginData({
        email: "",
        password: "",
      });
      res.data.data.role === "recruiter"
        ? navigate("/recruitdash")
        : navigate("/userdash");
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <section className=" bg-[var(--tertiary)] min-h-screen flex items-center justify-center">


        <div className="w-[80rem] h-[40rem] rounded-2xl  bg-[var(--primary)] p-8 flex space-x-8 ">
         
            <div className="w-[50rem] h-full rounded-2xl overflow-hidden">
              <video
                src="/login.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
          

          <form
            className="space-y-6 rounded-2xl p-15 bg-[var(--tet)]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-center p-3 font-medium text-white italic">
              Welcome to Hustle World
            </h1>

            <div>
              <label className="text-xl italic text-white font-bold ">
                Email:
              </label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                onChange={handlechange}
                value={loginData.email}
                className="border text-white border-blue-800 shadow-sm shadow-cyan-700 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-none focus:shadow-md focus:shadow-green-500"
                placeholder="yourexample@.com"
                required
              />
            </div>

            <div>
              <label className="text-xl italic text-white font-bold ">
                Password:
              </label>
              <br />
              <input
                type="password"
                onChange={handlechange}
                value={loginData.password}
                name="password"
                className="border text-white border-blue-800 shadow-sm shadow-cyan-700  rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-none focus:shadow-md focus:shadow-green-500"
                id="password"
                placeholder="**************"
                required
              />
            </div>

            <div className="text-right">
              <button
                className="text-[var(--tertiary)] font-bold underline"
                onClick={(e) => {
                  e.preventDefault();
                  setForgetPasswordModal(true);
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="border w-full rounded-2xl font-bold p-3 text-white border-blue-800 shadow-sm shadow-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-none focus:shadow-md focus:shadow-green-50 "
            >
              {loading ? "Logging in ..." : "Login"}
            </button>

            <div className="text-center text-[var(--tertiary)]">
              _______________ or _______________
              <br />
              <span className="text-md">
                Are you new ?{" "}
                <span className="underline">create an Account</span>
              </span>
            </div>
          </form>
        </div>

        <ForgetPassword
          isOpen={forgetPasswordModal}
          onClose={() => setForgetPasswordModal(false)}
        />
      </section>
    </>
  );
};

export default Login;
