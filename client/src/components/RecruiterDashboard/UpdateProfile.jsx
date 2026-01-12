import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { setuser } = useAuth();
  const [updateData, setUpdateData] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || ""
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateData);
    // onClose();

    try {
      const res = await api.put("/user/update", updateData);
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
      <div className="fixed inset-0 flex justify-center items-center bg-[var(--tertiary)]/60 ">
        <div className="bg-white w-4xl h-[80vh] border rounded-xl overflow-y-auto">
          <div className="flex justify-between border-b-2 p-2 sticky top-0 bg-[var(--primary)]">
            <span className="font-bold text-lg text-[var(--text)]">
              Update Profile
            </span>
            <button onClick={onClose} className="text-red-500 text-2xl">
              <RiCloseCircleFill />
            </button>
          </div>

          <div className="px-8 py-4 text-[var(--secondary)] font-bold">
            Email: {updateData.email}
          </div>
          <div className="p-8 pt-3 grid grid-cols-[30%_70%] gap-3 items-center">
            <label
              htmlFor="fullName"
              className="text-[var(--primary)] font-semibold"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={updateData.fullName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <label
              htmlFor="phone"
              className="text-[var(--primary)] font-semibold"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={updateData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="gender"
              className="text-[var(--primary)] font-semibold"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={updateData.gender}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="N/A">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label
              htmlFor="dob"
              className="text-[var(--primary)] font-semibold"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={updateData.dob}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyName"
              className="text-[var(--primary)] font-semibold"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={updateData.companyName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyDetail"
              className="text-[var(--primary)] font-semibold"
            >
              Company Detail
            </label>
            <textarea
              id="companyDetail"
              name="companyDetail"
              value={updateData.companyDetail}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            ></textarea>

            <label
              htmlFor="companySince"
              className="text-[var(--primary)] font-semibold"
            >
              Company Since
            </label>
            <input
              type="number"
              id="companySince"
              name="companySince"
              value={updateData.companySince}
              onChange={handleChange}
              min={0}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyEmployees"
              className="text-[var(--primary)] font-semibold"
            >
              Total Employees
            </label>
            <input
              type="number"
              id="companyEmployees"
              name="companyEmployees"
              value={updateData.companyEmployees}
              onChange={handleChange}
              min={0}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyEmail"
              className="text-[var(--primary)] font-semibold"
            >
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={updateData.companyEmail}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyPhone"
              className="text-[var(--primary)] font-semibold"
            >
              Company Phone
            </label>
            <input
              type="tel"
              id="companyPhone"
              name="companyPhone"
              value={updateData.companyPhone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="companyAddress"
              className="text-[var(--primary)] font-semibold"
            >
              Company Address
            </label>
            <textarea
              id="companyAddress"
              name="companyAddress"
              value={updateData.companyAddress}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            ></textarea>

            <label
              htmlFor="companyDescription"
              className="text-[var(--primary)] font-semibold"
            >
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={updateData.companyDescription}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            ></textarea>

            <label
              htmlFor="linkedin"
              className="text-[var(--primary)] font-semibold"
            >
              Company LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={updateData.linkedin}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <label
              htmlFor="companyWebsite"
              className="text-[var(--primary)] font-semibold"
            >
              Company Website
            </label>
            <input
              type="url"
              id="companyWebsite"
              name="companyWebsite"
              value={updateData.companyWebsite}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="twitter"
              className="text-[var(--primary)] font-semibold"
            >
              Company Twitter
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={updateData.twitter}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <label
              htmlFor="insta"
              className="text-[var(--primary)] font-semibold"
            >
              Company Instagram
            </label>
            <input
              type="url"
              id="insta"
              name="insta"
              value={updateData.insta}
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
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileModal;