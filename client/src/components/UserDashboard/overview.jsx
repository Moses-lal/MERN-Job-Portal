import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import api from "../../config/api";
import { useAuth } from "../../context/authcontext";
import Education from "./education"
import Preferredmodel from "./preferredmodel";
import AddExperienceModel from "./experience";
import AddProjectModel from "./project";

const overview = () => {
  const { user, setuser } = useAuth();

  const [loading, setloading] = useState(true);

  const [UpdateModelOpen, setUpdateModalOpen] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  useEffect(() => {
    setloading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-4 animate-pulse p-6">
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className=" flex items-center justify-center bg-gray-50 px-4  mt-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-2">
            Please login first
          </h2>
          <p className="text-md text-gray-800">
            Your session has no user data.
          </p>
        </div>
      </div>
    );
  }



  const handleDeleteEducation = async (eduId) => {
  try {
    const res = await api.delete(`/user/delete-education/${eduId}`);
    toast.success(res.data.message);
    sessionStorage.setItem("userData", JSON.stringify(res.data.data));
    setuser(res.data.data);
  } catch (error) {
    console.log(error);
    toast.error(
      `Error : ${error.response?.status} | ${error.response?.data?.message}`
    );
  }
};

const handleDeleteExperience = async (expId) => {
  try {
    const res = await api.delete(`/user/delete-experience/${expId}`);
    toast.success(res.data.message);
    sessionStorage.setItem("userData", JSON.stringify(res.data.data));
    setuser(res.data.data);
  } catch (error) {
    toast.error(`Error : ${error.response?.status} | ${error.response?.data?.message}`);
  }
};

const handleDeleteProject = async (projectId) => {
  try {
    const res = await api.delete(`/user/delete-project/${projectId}`);
    toast.success(res.data.message);
    sessionStorage.setItem("userData", JSON.stringify(res.data.data));
    setuser(res.data.data);
  } catch (error) {
    toast.error(`Error : ${error.response?.status} | ${error.response?.data?.message}`);
  }
};

  return (
    <>
      <div className=" h-[91vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">

        
        <div className="bg-white border border-gray-200 rounded-2xl p-6  mb-6 shadow-sm">
          <div className="flex gap-5 items-center">
          <p className="text-lg font-bold ">Your career preferences</p>
          <button onClick={() => setUpdateModalOpen(true)} className="text-lg font-bold text-gray-500"><FiEdit2 /></button>
          </div>
         
          <div className="flex gap-80 text-gray-500 mt-5">
            <div className="mt-4">
              <p className="text-gray-500 font-medium">Preferred job type</p>
              <span className="text-gray-700 font-bold">
                {user.preferredjob?.length > 0
                  ? user.preferredjob.join(", ")
                  : "N/A"}
              </span>
            </div>

            <div>
              <p className="font-medium">Avaibility to work : </p>
              <span className="text-gray-700 font-bold">
                {user.availability || "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 font-medium">Preferred location</p>
            <span className="text-gray-700 font-bold">
              {user.preferredlocation?.length > 0
                ? user.preferredlocation.join(", ")
                : "N/A"}
            </span>
          </div>
        </div>

<div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-lg font-semibold text-gray-800">
      Education
    </h2>

    <button
      onClick={() => setEducationModal(true)}
      className="px-4 py-2 text-sm font-medium text-white bg-[#3f88cc] rounded-lg hover:bg-[#2265a3] transition"
    >
      Add Education
    </button>
  </div>

  {user.education?.length > 0 ? (
    <div className="space-y-4">
      {user.education.map((edu, index) => (
        <div
          key={index}
          className="relative border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
        >
          {/* Delete Button */}
          <button
            onClick={() => handleDeleteEducation(edu._id)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <IoClose size={20} />
          </button>

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-[#1e3a5f] text-xl">
              <FaUserGraduate />
            </div>

            {/* Details */}
            <div className="flex-1 pr-8">
              <h3 className="font-semibold text-gray-900 text-base">
                {edu.degree}
              </h3>

              <p className="text-gray-600 mt-1">
                {edu.institute}
              </p>

              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">
                Percentage: {edu.percentage}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl">
      <p className="text-gray-500">
        No education added yet
      </p>
    </div>
  )}
</div>

<div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-lg font-semibold text-gray-800">Internships</h2>
    <button
      onClick={() => setExperienceModal(true)}
      className="px-4 py-2 text-sm font-medium text-white bg-[#3f88cc] rounded-lg hover:bg-[#2265a3] transition"
    >
      Add
    </button>
  </div>

  {user.experience?.length > 0 ? (
    <div className="space-y-4">
      {user.experience.map((exp, index) => (
        <div key={index} className="relative border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
          <button
            onClick={() => handleDeleteExperience(exp._id)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <IoClose size={20} />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-[#1e3a5f] text-xl font-bold">
              {exp.companyName.charAt(0)}
            </div>
            <div className="flex-1 pr-8">
              <h3 className="font-semibold text-gray-900">{exp.companyName}</h3>
              <p className="text-gray-600 text-sm mt-0.5">{exp.role}</p>
              <p className="text-gray-400 text-sm mt-0.5">{exp.startDate} to {exp.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl">
      <p className="text-gray-500">No experience added yet</p>
    </div>
  )}
</div>

<div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
    <button
      onClick={() => setProjectModal(true)}
      className="px-4 py-2 text-sm font-medium text-white bg-[#3f88cc] rounded-lg hover:bg-[#2265a3] transition"
    >
      Add
    </button>
  </div>

  {user.projects?.length > 0 ? (
    <div className="space-y-4">
      {user.projects.map((proj, index) => (
        <div key={index} className="relative border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
          <button
            onClick={() => handleDeleteProject(proj._id)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <IoClose size={20} />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-[#1e3a5f] text-xl">
              <FaCode />
            </div>
            <div className="flex-1 pr-8">
              <h3 className="font-semibold text-gray-900">{proj.projectName}</h3>
              <p className="text-gray-400 text-sm mt-0.5">{proj.startDate} to {proj.endDate}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">
                {proj.techStack}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl">
      <p className="text-gray-500">No projects added yet</p>
    </div>
  )}
</div>

        
      </div>

      <Preferredmodel
        isOpen={UpdateModelOpen}
        onClose={() => setUpdateModalOpen(false)}
      />
        
      <Education
        isOpen={educationModal}
        onClose={() => setEducationModal(false)}
      />
      
      <AddExperienceModel isOpen={experienceModal} onClose={() => setExperienceModal(false)} />
      <AddProjectModel    isOpen={projectModal}    onClose={() => setProjectModal(false)} />


    </>
  );
};

export default overview;
