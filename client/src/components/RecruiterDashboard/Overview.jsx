import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext";
import UpdateOverview from "../RecruiterDashboard/updateOverview";
import { FiEdit2, FiMapPin, FiBriefcase, FiUsers, FiFileText, FiPlus, FiArrowRight } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import api from "../../config/api";


const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const isActive = (job) =>
  !job.lastDateToApply || new Date(job.lastDateToApply) >= new Date();

const toStage = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("offer"))     return "offer";
  if (s.includes("interview")) return "interview";
  if (s.includes("review"))    return "review";
  if (s.includes("rejected"))  return "rejected";
  return "applied";
};

const STAGE = {
  offer:     { pill: "bg-emerald-100 text-emerald-700", label: "Offered"   },
  interview: { pill: "bg-amber-100 text-amber-700",     label: "Interview" },
  review:    { pill: "bg-blue-100 text-blue-700",       label: "Review"    },
  rejected:  { pill: "bg-red-100 text-red-500",         label: "Rejected"  },
  applied:   { pill: "bg-gray-100 text-gray-500",       label: "Applied"   },
};

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-600",
  "bg-teal-100 text-teal-600",
  "bg-amber-100 text-amber-600",
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
];

const STAGE_GRID = [
  { key: "offer",     bg: "bg-emerald-50", num: "text-emerald-700", lbl: "text-emerald-500", label: "Offered"   },
  { key: "interview", bg: "bg-amber-50",   num: "text-amber-700",   lbl: "text-amber-500",   label: "Interview" },
  { key: "review",    bg: "bg-blue-50",    num: "text-blue-700",    lbl: "text-blue-500",    label: "Review"    },
  { key: "applied",   bg: "bg-gray-50",    num: "text-gray-700",    lbl: "text-gray-400",    label: "Applied"   },
];


export default function RecruiterOverview() {
  const { user } = useAuth();
  const [editOpen, setEditOpen]       = useState(false);
  const [jobs, setJobs]               = useState([]);
  const [applicants, setApplicants]   = useState([]);
  const [sideLoading, setSideLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setSideLoading(true);
      try {
        const [j, a] = await Promise.all([
          api.get("/recruiter/get-posted-jobs"),
          api.get("/recruiter/get-applicants"),
        ]);
        setJobs(j.data.data || []);
        setApplicants(a.data.data || []);
      } catch (e) {
        console.error("Overview fetch failed:", e);
      } finally {
        setSideLoading(false);
      }
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-80 space-y-3 animate-pulse p-6">
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-5 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const r = {
    name:     user.fullName      || "Your Name",
    pronouns: user.pronouns      || "",
    title:    user.title         || "Your Job Title",
    location: user.location      || "Your Location",
    cover:    user.coverImage    || "",
    photo:    user.profileImage  || "",
    edu:      user.companyeducation    ? [user.companyeducation]    : [],
    exp:      user.recruiterExperience ? [user.recruiterExperience] : [],
  };

  const counts = applicants.reduce(
    (a, app) => { a[toStage(app.status)]++; return a; },
    { offer: 0, interview: 0, review: 0, rejected: 0, applied: 0 }
  );

  const activeCount = jobs.filter(isActive).length;

  return (
    <>
      {/* ── Page shell ── */}
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-5xl mx-auto space-y-4">

          {/* ══ TOP ROW: profile card + quick stats ══ */}
          <div className="grid grid-cols-3 gap-4">

            {/* Profile card — spans 2 cols */}
            <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Banner */}
              <div
                className="h-32 w-full bg-gradient-to-r from-teal-300 to-cyan-200"
                style={r.cover ? { backgroundImage: `url(${r.cover})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
              />

              <div className="px-6 pb-6">
                {/* Avatar row */}
                <div className="flex justify-between items-start">
                  <div className="relative -mt-12 mb-2">
                    {r.photo
                      ? <img src={r.photo} alt={r.name} className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-md" />
                      : <div className="w-20 h-20 rounded-2xl border-4 border-white bg-violet-100 text-violet-600 text-2xl font-bold flex items-center justify-center shadow-md">{getInitials(r.name)}</div>
                    }
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" title="Online" />
                  </div>
                  <button onClick={() => setEditOpen(true)} className="mt-2 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                    <FiEdit2 size={16} />
                  </button>
                </div>

                {/* Name + meta */}
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h1 className="text-xl font-bold text-slate-900">{r.name}</h1>
                  {r.pronouns && <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{r.pronouns}</span>}
                </div>
                <p className="text-sm font-medium text-slate-600">{r.title}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <FiMapPin size={11} /> {r.location}
                </p>

                {/* Divider */}
                <div className="border-t border-slate-100 my-4" />

                {/* Edu + Exp row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Education</p>
                    {r.edu.length > 0
                      ? r.edu.map((e, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <LuGraduationCap size={13} className="text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{e.degree}</p>
                              <p className="text-xs text-slate-400">{e.institute}</p>
                            </div>
                          </div>
                        ))
                      : <p className="text-sm text-slate-400">Not added yet</p>
                    }
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Experience</p>
                    {r.exp.length > 0
                      ? r.exp.map((e, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FaCode size={13} className="text-teal-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{e.companyName}</p>
                              {e.role && <p className="text-xs text-slate-400">{e.role}</p>}
                            </div>
                          </div>
                        ))
                      : <p className="text-sm text-slate-400">Not added yet</p>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats — 1 col */}
            <div className="flex flex-col gap-4">
              {/* Jobs stat */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FaLaptopCode size={18} className="text-blue-500" />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${activeCount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                    {activeCount} active
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{jobs.length}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Jobs posted</p>
                </div>
              </div>

              {/* Applicants stat */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <FiUsers size={18} className="text-teal-400" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
                    {counts.interview} in review
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{applicants.length}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Total applicants</p>
                </div>
              </div>
            </div>
          </div>

          {/* ══ BOTTOM ROW: jobs list + applicants ══ */}
          {sideLoading ? (
            <div className="grid grid-cols-2 gap-4 animate-pulse">
              <div className="h-64 bg-slate-200 rounded-2xl" />
              <div className="h-64 bg-slate-200 rounded-2xl" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">

              {/* Jobs list card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-700">Posted Jobs</h2>
                  <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer">
                    <FaPlus size={9} /> Post new
                  </button>
                </div>

                {jobs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                      <FiFileText size={18} className="text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-400">No jobs posted yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {jobs.slice(0, 4).map((job, i) => {
                      const active = isActive(job);
                      return (
                        <div key={job._id || i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <FiBriefcase size={14} className="text-slate-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">{job.title}</p>
                            <p className="text-xs text-slate-400 truncate">{job.location || "Remote"} · {job.jobType || "Full-time"}</p>
                          </div>
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${active ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400"}`}>
                            {active ? "Active" : "Closed"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {jobs.length > 4 && (
                  <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors py-1">
                    View all {jobs.length} jobs <FiArrowRight size={11} />
                  </button>
                )}
              </div>

              {/* Applicants card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-700">Applicants</h2>
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                    View all <FiArrowRight size={11} />
                  </button>
                </div>

                {/* Stage grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {STAGE_GRID.map(({ key, bg, num, lbl, label }) => (
                    <div key={key} className={`${bg} rounded-xl p-2.5 text-center`}>
                      <p className={`text-lg font-bold ${num}`}>{counts[key]}</p>
                      <p className={`text-[10px] ${lbl} mt-0.5`}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent applicants */}
                {applicants.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                      <FiUsers size={18} className="text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-400">No applicants yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Recent</p>
                    {applicants.slice(0, 3).map((app, i) => {
                      const name  = app.userID?.fullName || "Unknown";
                      const stage = toStage(app.status);
                      return (
                        <div key={app._id || i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                            {getInitials(name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">{name}</p>
                            <p className="text-xs text-slate-400 truncate">{app.jobID?.title || "Applicant"}</p>
                          </div>
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${STAGE[stage].pill}`}>
                            {STAGE[stage].label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      <UpdateOverview isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}