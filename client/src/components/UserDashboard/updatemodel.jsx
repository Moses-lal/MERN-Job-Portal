import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../../config/api";
import { useAuth } from "../../context/authcontext";

const updateModel = ({ isOpen, onClose }) => {
  
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
    // console.log(updateData);
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
      <div className="fixed inset-0 flex justify-center items-center bg-[var(--primary)]/96 ">
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
              htmlFor="bio"
              className="text-[var(--primary)] font-semibold"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={updateData.bio}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            ></textarea>

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
              htmlFor="exp"
              className="text-[var(--primary)] font-semibold"
            >
              Experience (in years)
            </label>
            <input
              type="number"
              id="exp"
              name="exp"
              value={updateData.exp}
              onChange={handleChange}
              min={0}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="qualification"
              className="text-[var(--primary)] font-semibold"
            >
              Qualification
            </label>
            <select
              name="qualification"
              id="qualification"
              value={updateData.qualification}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="N/A">Select Qualification</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>

            <label
              htmlFor="skills"
              className="text-[var(--primary)] font-semibold"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={updateData.skills}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label
              htmlFor="address"
              className="text-[var(--primary)] font-semibold"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={updateData.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            ></textarea>

            <label
              htmlFor="linkedin"
              className="text-[var(--primary)] font-semibold"
            >
              LinkedIn Profile
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
              htmlFor="github"
              className="text-[var(--primary)] font-semibold"
            >
              GitHub Profile
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={updateData.github}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <label
              htmlFor="twitter"
              className="text-[var(--primary)] font-semibold"
            >
              Twitter Profile
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
              Instagram Profile
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

export default updateModel;
