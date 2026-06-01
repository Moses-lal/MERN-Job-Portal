import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../../config/api";
import { useAuth } from "../../context/authcontext";

const AddEducationModel = ({ isOpen, onClose }) => {
  const { setuser } = useAuth();

  const [educationData, setEducationData] = useState({
    degree: "",
    institute: "",
    percentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/education", educationData);
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

          {/* Header */}
          <div className="flex justify-between border-b-2 p-2 sticky top-0 bg-[var(--primary)]">
            <span className="font-bold text-lg text-[var(--text)]">
              Add Education
            </span>
            <button onClick={onClose} className="text-red-500 text-2xl">
              <RiCloseCircleFill />
            </button>
          </div>

          <div className="p-8 pt-3 grid grid-cols-[30%_70%] gap-3 items-center">

            <label htmlFor="degree" className="text-[var(--primary)] font-semibold">
              Degree / Level
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={educationData.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech, Class XII, Class X"
              className="border p-2 rounded w-full"
            />

            <label htmlFor="institute" className="text-[var(--primary)] font-semibold">
              Institute Name
            </label>
            <input
              type="text"
              id="institute"
              name="institute"
              value={educationData.institute}
              onChange={handleChange}
              placeholder="e.g. Madhav Institute of Technology"
              className="border p-2 rounded w-full"
            />

            <label htmlFor="percentage" className="text-[var(--primary)] font-semibold">
              Percentage / CGPA
            </label>
            <input
              type="text"
              id="percentage"
              name="percentage"
              value={educationData.percentage}
              onChange={handleChange}
              placeholder="e.g. 85% or 8.5 CGPA"
              className="border p-2 rounded w-full"
            />

            {/* Buttons */}
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
              Add Education
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddEducationModel;