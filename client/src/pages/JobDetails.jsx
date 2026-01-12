import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../config/api";

const JobDetails = () => {
  const { isLogin, isRecruiter } = useAuth();
  const locationState = useLocation().state || {};
  const navigate = useNavigate();
  const { selectedJob } = locationState;

  const handleApplyNow = async () => {
    // Handle apply now action

    if (!isLogin) {
      toast.error("Please login to apply for jobs.");
      return;
    }

    if (isLogin && isRecruiter) {
      toast.error("Recruiters cannot apply for jobs.");
      return;
    }

    try {
      const res = await api.post("/user/apply-job", { jobID: selectedJob._id });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    }

    toast.success("Application submitted successfully!");
  };

  const handleSave = () => {
    // Handle save job action
    if (!isLogin) {
      toast.error("Please login to save jobs.");
      return;
    }

    if (isLogin && isRecruiter) {
      toast.error("Recruiters cannot save jobs.");
      return;
    }

    toast.success("Job saved successfully!");
  };

  if (!selectedJob) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No job details available.
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please go back and select a job.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const company = selectedJob.recruiterID || {};
  const skills = selectedJob.skills
    ? selectedJob.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const posted = selectedJob.createdAt
    ? new Date(selectedJob.createdAt).toLocaleDateString()
    : "-";
  const lastApply = selectedJob.lastDateToApply
    ? new Date(selectedJob.lastDateToApply).toLocaleDateString()
    : "-";

  console.log("Selected Job Details:", selectedJob);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main product-like panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedJob.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  {company.companyName || selectedJob.company} • Posted:{" "}
                  {posted}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-100">
                    {selectedJob.jobType}
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                    {selectedJob.workType}
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-800 border border-gray-100">
                    {selectedJob.experienceLevel}
                  </span>
                </div>
              </div>

              {/* Prominent salary box */}
              <div className="flex-shrink-0">
                <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 p-4 text-center w-48">
                  <div className="text-sm text-yellow-700">Salary</div>
                  <div className="mt-2 text-3xl font-extrabold text-yellow-900">
                    {selectedJob.salary
                      ? `₹${selectedJob.salary}`
                      : "Negotiable"}
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    {selectedJob.noOfOpenings || 1} opening(s)
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm"
                    onClick={handleApplyNow}
                  >
                    Apply Now
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
              <p className="mt-3 text-gray-700 whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>
          </div>

          {/* Requirements / Product Specs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">
              Requirements
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Experience</div>
                <div className="font-medium text-gray-900 mt-1">
                  {selectedJob.experienceLevel}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Job Type</div>
                <div className="font-medium text-gray-900 mt-1">
                  {selectedJob.jobType}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Work Type</div>
                <div className="font-medium text-gray-900 mt-1">
                  {selectedJob.workType}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium text-gray-900 mt-1">
                  {selectedJob.location}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-gray-500">Skills</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-800"
                    >
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    No skills listed.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300"
            >
              Back
            </button>
          </div>
          {/* Last Apply - highlighted */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Last Date to Apply</div>
                <div className="mt-1 text-lg font-bold text-red-700">
                  {lastApply}
                </div>
              </div>
              <div
                className={`px-3 py-2 rounded-full text-xs font-semibold ${(() => {
                  try {
                    const days = Math.ceil(
                      (new Date(selectedJob.lastDateToApply) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    );
                    if (days <= 3) return "bg-red-600 text-white";
                    if (days <= 7) return "bg-amber-500 text-white";
                    return "bg-green-100 text-green-800";
                  } catch (e) {
                    return "bg-gray-100 text-gray-800";
                  }
                })()}`}
              >
                {(() => {
                  try {
                    const days = Math.ceil(
                      (new Date(selectedJob.lastDateToApply) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    );
                    if (days < 0) return `${Math.abs(days)} days ago`;
                    return `${days} days left`;
                  } catch (e) {
                    return "-";
                  }
                })()}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Make sure to apply before the deadline. Late applications may not
              be considered.
            </p>
          </div>

          {/* Recruiter / Company Card with social links (photo only in sidebar) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {company.photo ? (
                  <img
                    src={company.photo}
                    alt={company.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-600">
                    {company.fullName?.charAt(0) || "R"}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {company.fullName}
                </div>
                <div className="text-sm text-gray-500">
                  {company.companyName}
                </div>
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <div>
                    Email:{" "}
                    <a
                      className="text-indigo-600"
                      href={`mailto:${company.companyEmail}`}
                    >
                      {company.companyEmail}
                    </a>
                  </div>
                  <div>
                    Phone:{" "}
                    <a
                      className="text-indigo-600"
                      href={`tel:${company.companyPhone}`}
                    >
                      {company.companyPhone}
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM7.5 8h3.84v2.18h.05c.54-1.02 1.86-2.09 3.83-2.09 4.1 0 4.86 2.7 4.86 6.21V24h-4v-7.5c0-1.8-.03-4.12-2.51-4.12-2.51 0-2.89 1.96-2.89 3.99V24h-4z" />
                      </svg>
                    </a>
                  )}
                  {company.insta && (
                    <a
                      href={company.insta}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 hover:text-pink-800"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm8.5 3a1.5 1.5 0 11.001 3.001A1.5 1.5 0 0115.5 5zM12 8a4 4 0 110 8 4 4 0 010-8z" />
                      </svg>
                    </a>
                  )}
                  {company.twitter && (
                    <a
                      href={company.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-600 hover:text-sky-800"
                      aria-label="Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.71 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 5.1a4.28 4.28 0 001.33 5.71c-.65-.02-1.27-.2-1.81-.5v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.81.07 4.28 4.28 0 003.99 2.97A8.58 8.58 0 012 19.54a12.09 12.09 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0022.46 6z" />
                      </svg>
                    </a>
                  )}
                  {company.companyWebsite && (
                    <a
                      href={company.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                      aria-label="Website"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 14.5v-1.79A6.98 6.98 0 0112 18a6.98 6.98 0 01-3-13.29V6.5A8.5 8.5 0 0015 16.5z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;