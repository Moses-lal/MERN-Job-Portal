import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    role :"",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let isvalid = true;
    const err = {};

     if(!registerData.role){
      err.role = "Please select a Role";
      isvalid = false;
    }

    if (registerData.fullName.length < 3) {
      err.fullName = " Name Should be of atleast 3 character ";
      isvalid = false;
    }

    if (!/^[A-Za-z ]+$/.test(registerData.fullName)) {
      err.fullName = "Only Alphabets are allowed";
      isvalid = false;
    }

    if (
      !/^[A-Za-z\d._]+@gmail.com$/.test(registerData.email) ||
      registerData.email.length < 10
    ) {
      err.email = "Please enter a correct mail ";
      isvalid = false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        registerData.password
      )
    ) {
      err.password = "Please choose a Strong Password";
      isvalid = false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      err.confirmPassword = "password is not match  ";
      isvalid = false;
    }

    setError(err);

    return isvalid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!validate()) {
      setLoading(false);
      toast.error("please solve the error ");
      return;
    }

    // setTimeout(() => {
    //   console.log(registerData);
    //   setRegisterData({
    //     fullName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    //   setLoading(false);
    //   toast.success("registration successfull")
    // }, 2000);

    try {
      const res = await api.post("/auth/register", registerData);
      toast.success(res.data.message);

      setRegisterData({
        fullName: "",
        email: "",
        role: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      console.log("error in registering ", error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message} `
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" bg-gray-900 min-h-screen flex items-center justify-center bg-[url('./register2.jpg')] bg-cover">
      
        <div className="min-w-md bg-white rounded-2xl p-8 border-t-2 flex space-x-1 mt-5 border-t-[var(--text)] border-e-2 border-e-[var(--text)] transition-all ease-out duration-500 hover:shadow-xl hover:shadow-[#6BA3D6] hover:-translate-y-4 hover:scale-[1.05]">

          <div className="text-2xl border max-h-md min-w-sm bg-[url('./register3.avif')] bg-contain flex items-end justify-center">
            
            <div className="bg-white rounded-2xl font-bold p-3 ">
              Looking For a <br />
              Job we Got what You Want !! <br />
              Sign Up :)
            </div>
          </div>

          <form className="space-y-2 borde p-3 text-[var(--primary)]" onSubmit={handleSubmit}>
          <h1 className="text-[var(--text)] text-2xl font-bold mb-3 "> Register/Sign Up   </h1>

            <div>
              <label
                className="block font-bold text-xl "
                htmlFor="role"
              >
                Role :
              </label>
              <span className="flex justify-center items-center gap-5">
                <span className="flex gap-2">
                <input type="radio" name="role" id="applicant" value={"applicant"} onChange={handlechange} className="accent-purple-800" />
                <label htmlFor="applicant" className=" transition-all duration-200 text-xl hover:underline hover:text-[var(--text)]">Applicant</label>
                </span>
               
               <span className="flex gap-2">
                <input type="radio" name="role" id="recruiter" value={"recruiter"} onChange={handlechange} className="accent-purple-800"/>
                <label htmlFor="recruiter" className="transition-all duration-200 text-xl hover:underline hover:text-[var(--text)]">Recruiter</label>
               </span>
               
              </span>
                
        
              {error.role && (
                <p className="text-red-500 text-sm mt-1">{error.role}</p>
              )}
            </div>
            <div>
                <label className="block text-xl font-bold">FullName:</label>
                <input
                  type="name"
                  id="fullName"
                  name="fullName"
                  className="border-b-1 w-full p-2 focus:outline-[var(--text)]"
                  value={registerData.fullName}
                  onChange={handlechange}
                  placeholder="Name.."
                />
              {error.fullName && (
                <p className="text-red-500 text-sm mt-1 mx-15">
                  {error.fullName}
                </p>
              )}
            </div>

            <div>
                <label className="block text-xl font-bold">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border-b-1 w-full p-2 focus:outline-[var(--text)]"
                  value={registerData.email}
                  onChange={handlechange}
                  placeholder="user@email.com"
                />
            
              {error.email && (
                <p className="text-red-500 text-sm mt-1 mx-15">{error.email}</p>
              )}
            </div>

            <div>
                <label className="block text-xl font-bold">Password:</label>
                <input
                  type="password"
                  className="border-b-1 w-full p-2 focus:outline-[var(--text)]"
                  id="password"
                  name="password"
                  value={registerData.password}
                  onChange={handlechange}
                  placeholder="*****************"
                />
              {error.password && (
                <p className="text-red-500 text-sm mt-1 mx-15">
                  {error.password}
                </p>
              )}
            </div>

            <div>
                <label className="text-xl font-bold ">Confirm Password:</label>
                <input
                  type="password"
                  className="border-b-1 w-full p-2 focus:outline-[var(--text)]"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handlechange}
                  placeholder="*****************"
                />
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 mx-15">
                  {error.confirmPassword}
                </p>
              )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-xl font-bold">Phone:</label>
                <input
                  type="name"
                  id="phone"
                  name="phone"
                  className="border-b-1 w-full p-2 focus:outline-[var(--text)]"
                  value={registerData.phone}
                  onChange={handlechange}
                  placeholder="+91"
                />
            
              {error.phone && (
                <p className="text-red-500 text-sm mt-1 mx-15">
                  {error.phone}
                </p>
              )}
            </div>

            <button type="submit" className="border w-full p-3 rounded-2xl">
               {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

      </div>
    </>
  );
};

export default Register;
