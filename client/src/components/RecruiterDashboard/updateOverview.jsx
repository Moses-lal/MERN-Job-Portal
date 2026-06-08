import React, { useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authcontext";

const UpdateOverview = ({ isOpen, onClose }) => {

  const { user, setuser } = useAuth();

  const [formData, setFormData] = useState({
    pronouns:   user?.pronouns                          || "",
    title:      user?.title                             || "",
    location:   user?.location                          || "",
    degree:     user?.companyeducation?.degree          || "",
    institute:  user?.companyeducation?.institute       || "",
    companyName:user?.recruiterExperience?.companyName  || "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/recruiter/update-profile", formData);
      setuser(res.data.user);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--secondary)]/90 z-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between bg-[#1e2a3a] px-6 py-4">
          <h2 className="text-white font-semibold text-lg">Update Profile</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Email */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-sm font-semibold text-gray-800">
            Email: <span className="font-normal">{user?.email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-5 mt-2">

          {/* Pronouns */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Pronouns</label>
            <input
              type="text"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
              placeholder="e.g. He/Him, She/Her"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Job Title */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Recruiter"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Pune, Maharashtra, India"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Degree */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech, MBA"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Institute */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Institute</label>
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              placeholder="e.g. Priyadarshini Institute"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Company Name */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-semibold text-gray-800 shrink-0">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Moju Tech Pvt Ltd"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-[#1e2a3a] hover:bg-[#2a3a4f] text-white rounded disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateOverview;