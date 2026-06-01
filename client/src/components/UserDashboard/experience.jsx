import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../../config/api";
import { useAuth } from "../../context/authcontext";

const AddExperienceModel = ({ isOpen, onClose }) => {
  const { setuser } = useAuth();

  const [experienceData, setExperienceData] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/experience", experienceData);
      toast.success(res.data.message);
      sessionStorage.setItem("userData", JSON.stringify(res.data.data));
      setuser(res.data.data);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-[var(--primary)]/96">
        <div className="bg-white w-2xl border rounded-xl overflow-y-auto">
          <div className="flex justify-between border-b-2 p-2 sticky top-0 bg-[var(--primary)]">
            <span className="font-bold text-lg text-[var(--text)]">
              Add Experience
            </span>
            <button onClick={onClose} className="text-red-500 text-2xl">
              <RiCloseCircleFill />
            </button>
          </div>

          <div className="p-8 pt-3 grid grid-cols-[30%_70%] gap-3 items-center">

            <label htmlFor="companyName" className="text-[var(--primary)] font-semibold">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={experienceData.companyName}
              onChange={handleChange}
              placeholder="e.g. Google, TCS"
              className="border p-2 rounded w-full"
            />

            <label htmlFor="role" className="text-[var(--primary)] font-semibold">
              Role / Position
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={experienceData.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer Intern"
              className="border p-2 rounded w-full"
            />

            <label htmlFor="startDate" className="text-[var(--primary)] font-semibold">
              Start Date
            </label>
            <input
              type="month"
              id="startDate"
              name="startDate"
              value={experienceData.startDate}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label htmlFor="endDate" className="text-[var(--primary)] font-semibold">
              End Date
            </label>
            <input
              type="month"
              id="endDate"
              name="endDate"
              value={experienceData.endDate}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Add Experience
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddExperienceModel;