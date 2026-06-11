import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { TbWorldShare } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import api from "../config/api";

const JobDetails = () => {
  const { isLogin, isRecruiter } = useAuth();
  const { selectedJob: jobFromState } = useLocation().state || {};
  const navigate = useNavigate();

  const [selectedJob, setSelectedJob] = useState(jobFromState);

  useEffect(() => {
    if (jobFromState?._id) {
      api
        .get(`/public/jobs/${jobFromState._id}`)
        .then((res) => setSelectedJob(res.data.data))
        .catch(() => {});
    }
  }, [jobFromState?._id]);

  if (!selectedJob) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-sm">
          <h2 className="text-lg font-semibold text-gray-800">No job selected</h2>
          <p className="text-sm text-gray-500 mt-1">Go back and select a job.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const company = selectedJob.recruiterID || {};
  const skills = selectedJob.skills
    ? selectedJob.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const posted = selectedJob.createdAt
    ? new Date(selectedJob.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "-";
  const lastApply = selectedJob.lastDateToApply
    ? new Date(selectedJob.lastDateToApply).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "-";
  const deadlineDays = selectedJob.lastDateToApply
    ? Math.ceil((new Date(selectedJob.lastDateToApply) - new Date()) / (1000 * 60 * 60 * 24))
    : null;
  const isPastDeadline = deadlineDays !== null && deadlineDays < 0;

  const deadlineBadge = () => {
    if (deadlineDays === null) return null;
    if (deadlineDays < 0) return { label: "Deadline passed", cls: "bg-gray-100 text-gray-500" };
    if (deadlineDays === 0) return { label: "Last day!", cls: "bg-red-600 text-white" };
    if (deadlineDays <= 3) return { label: `${deadlineDays}d left`, cls: "bg-red-600 text-white" };
    if (deadlineDays <= 7) return { label: `${deadlineDays}d left`, cls: "bg-amber-500 text-white" };
    return { label: `${deadlineDays}d left`, cls: "bg-green-100 text-green-800" };
  };

  const handleApplyNow = async () => {
    if (!isLogin) return toast.error("Please login to apply for jobs.");
    if (isRecruiter) return toast.error("Recruiters cannot apply for jobs.");
    if (isPastDeadline) return toast.error("The application deadline has passed.");
    try {
      const res = await api.post("/user/apply-job", { jobID: selectedJob._id });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(`Error: ${error.response?.status} | ${error.response?.data?.message}`);
    }
  };

  const handleSave = () => {
    if (!isLogin) return toast.error("Please login to save jobs.");
    if (isRecruiter) return toast.error("Recruiters cannot save jobs.");
    toast.success("Job saved successfully!");
  };

  const badge = deadlineBadge();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-gray-500 hover:text-gray-800">
          ← Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main panel */}
          <div className="lg:col-span-2 space-y-5">

            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                {/* Title + tags */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {company.companyName || selectedJob.company} · Posted {posted}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[selectedJob.jobType, selectedJob.workType, selectedJob.experienceLevel].filter(Boolean).map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Salary + buttons */}
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
                    <div className="text-xs text-amber-700 uppercase tracking-wide font-medium">Salary</div>
                    <div className="text-2xl font-extrabold text-amber-900 mt-1">
                      {selectedJob.salary ? `₹${Number(selectedJob.salary).toLocaleString("en-IN")}` : "Negotiable"}
                    </div>
                    <div className="text-xs text-amber-700 mt-1">
                      {selectedJob.noOfOpenings || 1} opening{selectedJob.noOfOpenings > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleApplyNow}
                      disabled={isPastDeadline}
                      className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isPastDeadline ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {isPastDeadline ? "Closed" : "Apply Now"}
                    </button>
                    <button onClick={handleSave} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                      Save
                    </button>
                  </div>
                  {isPastDeadline && (
                    <p className="mt-2 text-xs text-center text-gray-400">Applications are no longer accepted</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <h2 className="text-base font-semibold text-gray-800 mb-2">About this role</h2>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Requirements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Experience", value: selectedJob.experienceLevel },
                  { label: "Job type", value: selectedJob.jobType },
                  { label: "Work type", value: selectedJob.workType },
                  { label: "Location", value: selectedJob.location },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{value || "—"}</div>
                  </div>
                ))}
              </div>

              {skills.length > 0 && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((sk) => (
                      <span key={sk} className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* Deadline */}
            <div className={`rounded-2xl p-5 border shadow-sm ${isPastDeadline ? "bg-gray-50 border-gray-200" : "bg-white border-red-100"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Deadline</span>
                {badge && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                )}
              </div>
              <div className={`text-xl font-bold ${isPastDeadline ? "text-gray-400 line-through" : "text-red-700"}`}>
                {lastApply}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {isPastDeadline ? "This job is no longer accepting applications." : "Apply before this date."}
              </p>
            </div>

            {/* Recruiter */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-3">Posted by</div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {company.photo ? (
                    <img src={company.photo} alt={company.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-indigo-400">
                      {company.fullName?.charAt(0)?.toUpperCase() || "R"}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{company.fullName || "Recruiter"}</div>
                  <div className="text-xs text-gray-500">{company.companyName || "—"}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                {company.companyEmail ? (
                  <a href={`mailto:${company.companyEmail}`} className="flex items-center gap-2 text-md  text-blue-400 hover:text-blue-800">
                    <SiGmail /> {company.companyEmail}
                  </a>
                ) : (
                  <span className="text-gray-400 text-xs italic">No email available</span>
                )}
                {company.companyPhone && (
                  <a href={`tel:${company.companyPhone}`} className="flex items-center gap-2 text-md  text-blue-400 hover:text-blue-800">
                    <FaPhone /> {company.companyPhone}
                  </a>
                )}
              </div>

              {(company.linkedin || company.insta || company.twitter || company.companyWebsite) && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6">
                  {company.linkedin && (
                    <a href={company.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 text-2xl">
                      <FaLinkedin />
                    </a>
                  )}
                  {company.insta && (
                    <a href={company.insta} target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-700 text-2xl">
                      <FaInstagram />
                    </a>
                  )}
                  {company.twitter && (
                    <a href={company.twitter} target="_blank" rel="noreferrer" className="text-black/70 hover:text-black text-2xl">
                      <FaXTwitter />
                    </a>
                  )}
                  {company.companyWebsite && (
                    <a href={company.companyWebsite} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700 text-2xl">
                      <TbWorldShare />
                    </a>
                  )}
                </div>
              )}
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;