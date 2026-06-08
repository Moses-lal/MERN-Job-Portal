import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../../config/api";
import { useAuth } from "../../context/authcontext";

const UpdateJobPreferenceModel = ({ isOpen, onClose }) => {
  const { setuser } = useAuth();

  const [preferenceData, setPreferenceData] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || {}
  );

  const JOB_TYPES = [
    { value: "internship", label: "Internship" },
    { value: "fulltime", label: "Full Time" },
    { value: "parttime", label: "Part Time" },
    { value: "wfh", label: "Work From Home" },
    { value: "hybrid", label: "Hybrid" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
  ];

  const AVAILABILITY_OPTIONS = [
    { value: "immediate", label: "Immediate" },
    { value: "15days", label: "15 Days or Less" },
    { value: "1month", label: "1 Month" },
    { value: "morethan1month", label: "More than 1 Month" },
  ];

  const handleLocationKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newLocation = e.target.value.trim();
      if (!preferenceData.preferredlocation.includes(newLocation)) {
        setPreferenceData((prev) => ({
          ...prev,
          preferredlocation: [...prev.preferredlocation, newLocation],
        }));
      }
      e.target.value = "";
    }
  };

  const removeLocation = (location) => {
    setPreferenceData((prev) => ({
      ...prev,
      preferredlocation: prev.preferredlocation.filter((l) => l !== location),
    }));
  };

  const toggleJobType = (value) => {
    setPreferenceData((prev) => ({
      ...prev,
      preferredjob: prev.preferredjob.includes(value)
        ? prev.preferredjob.filter((t) => t !== value)
        : [...prev.preferredjob, value],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferenceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/user/preferences", {
        preferredjob:      preferenceData.preferredjob,
        availability:      preferenceData.availability,
        preferredlocation: preferenceData.preferredlocation,
      });
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
    <div className="fixed inset-0 flex justify-center items-center bg-[var(--primary)]/96">
      <div className="bg-white w-2xl h-[80vh] border rounded-xl overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between border-b-2 p-2 sticky top-0 bg-[var(--primary)]">
          <span className="font-bold text-lg text-[var(--text)]">
            Update Job Preferences
          </span>
          <button onClick={onClose} className="text-red-500 text-2xl">
            <RiCloseCircleFill />
          </button>
        </div>

        <div className="p-8 flex flex-col gap-6">

          {/* Preferred Job Locations */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--primary)] font-semibold">
              Preferred Job Locations
            </label>
            <input
              type="text"
              placeholder="Type a city and press Enter (e.g. Mumbai)"
              onKeyDown={handleLocationKeyDown}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-0"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {preferenceData.preferredlocation?.map((loc) => (
                <span
                  key={loc}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {loc}
                  <button
                    onClick={() => removeLocation(loc)}
                    className="text-blue-400 hover:text-red-500 transition"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--primary)] font-semibold">
              Job Type <span className="text-gray-400 font-normal text-sm">(Select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleJobType(value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    preferenceData.preferredjob?.includes(value)
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--primary)] font-semibold">
              Availability
            </label>
            <div className="flex flex-col gap-2">
              {AVAILABILITY_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={value}
                    checked={preferenceData.availability === value}
                    onChange={handleChange}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Save Preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdateJobPreferenceModel;