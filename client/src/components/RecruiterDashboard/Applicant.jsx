import React, { useEffect, useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";

const STATUSES = ["Applied", "Under Review", "Interview Scheduled", "Offered", "Rejected"];

const STATUS_STYLE = {
  "Applied":               "bg-[#1E2A38] text-[#6BA3D6] border-[#6BA3D6]/30",
  "Under Review":          "bg-[#2a2e38] text-[#BFC3C9] border-[#BFC3C9]/30",
  "Interview Scheduled":   "bg-[#1a2a1a] text-[#4caf7d] border-[#4caf7d]/30",
  "Offered":               "bg-[#1a2a1a] text-[#4caf50] border-[#4caf50]/30",
  "Rejected":              "bg-[#2e1a1a] text-[#e57373] border-[#e57373]/30",
};

const ACCENT = ["text-[#6BA3D6]","text-[#4caf7d]","text-[#e5a94b]","text-[#a78bfa]","text-[#f48fb1]"];
const getInitials = (n="") => n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
const getAccent  = (n="") => ACCENT[(n.charCodeAt(0)||0) % ACCENT.length];

export default function Applicants() {
  const [apps, setApps]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try   { setApps((await api.get("/recruiter/get-applicants")).data.data || []); }
    catch { toast.error("Failed to fetch applicants"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/recruiter/update-status/${id}`, { status });
      toast.success("Status updated");
      setApps(p => p.map(a => a._id === id ? { ...a, status } : a));
    } catch { toast.error("Failed to update status"); }
  };

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="p-10 max-w-5xl mx-auto text-[#BFC3C9]">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E2A38]">Applicants</h1>
          {!loading && <p className="text-sm text-[#6BA3D6] mt-1">{apps.length} candidate{apps.length !== 1 ? "s" : ""}</p>}
        </div>
        <button onClick={load} className="text-xs font-medium px-4 py-2 rounded-lg border border-[#3C3F46] text-black hover:border-[#6BA3D6] hover:text-[#6BA3D6] transition-colors cursor-pointer bg-transparent">
          ↺ Refresh
        </button>
      </div>

      {/* ── Skeleton ── */}
      {loading && [...Array(3)].map((_,i) => (
        <div key={i} className="h-32 rounded-2xl bg-[#1E2A38] border border-[#3C3F46] mb-4 animate-pulse" />
      ))}

      {/* ── Empty ── */}
      {!loading && apps.length === 0 && (
        <div className="text-center py-20">
          <p className="text-base font-medium text-white">No applicants yet</p>
          <p className="text-sm text-[#3C3F46] mt-2">Candidates who apply will appear here.</p>
        </div>
      )}

      {/* ── Cards ── */}
      {!loading && apps.map((app) => {
        const u   = app.userID || {};
        const job = app.jobID  || {};
        const open   = expanded[app._id];
        const skills = typeof u.skills === "string" ? u.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];

        return (
          <div key={app._id} className="bg-[#1E2A38] border border-[#3C3F46] rounded-2xl mb-4 overflow-hidden">

            {/* Body */}
            <div className="p-8">

              {/* Avatar + Name + Badge */}
              <div className="flex gap-6 items-start">
                {u.photo
                  ? <img src={u.photo} alt="" className="w-16 h-16 rounded-xl object-cover border border-[#3C3F46] shrink-0" />
                  : <div className={`w-16 h-16 rounded-xl bg-[#3C3F46] flex items-center justify-center text-lg font-bold shrink-0 ${getAccent(u.fullName)}`}>{getInitials(u.fullName)}</div>
                }
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start flex-wrap gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">{u.fullName || "Unknown"}</p>
                      <p className="text-sm text-[#BFC3C9] mt-1">{u.email}{u.phone ? ` · ${u.phone}` : ""}</p>
                    </div>
                    <span className={`text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg border ${STATUS_STYLE[app.status] || STATUS_STYLE["Applied"]}`}>
                      {app.status}
                    </span>
                  </div>
                  {/* Job */}
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    <span className="text-xs text-[#6BA3D6]">Applied for</span>
                    <span className="text-xs font-medium bg-[#3C3F46] text-white px-2.5 py-1 rounded-lg">{job.title || "—"}</span>
                    {job.location && <span className="text-xs text-[#BFC3C9]">· {job.location}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-[#3C3F46] mt-6 pt-5 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#BFC3C9]">Status:</span>
                  <select value={app.status} onChange={e => updateStatus(app._id, e.target.value)}
                    className="text-xs font-medium px-3 py-2 rounded-lg border border-[#3C3F46] bg-[#3C3F46] text-white cursor-pointer outline-none">
                    {STATUSES.map(s => <option key={s} className="bg-[#1E2A38]">{s}</option>)}
                  </select>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a href={`mailto:${u.email}`} className="text-xs font-medium px-4 py-2 rounded-lg border border-[#6BA3D6]/40 bg-[#6BA3D6]/10 text-[#6BA3D6] no-underline hover:bg-[#6BA3D6]/20 transition-colors">Email</a>
                  {u.linkedin && u.linkedin !== "N/A" && <a href={u.linkedin} target="_blank" rel="noreferrer" className="text-xs font-medium px-4 py-2 rounded-lg border border-[#3C3F46] text-[#BFC3C9] no-underline hover:border-[#6BA3D6] transition-colors">LinkedIn</a>}
                  {u.github   && u.github   !== "N/A" && <a href={u.github}   target="_blank" rel="noreferrer" className="text-xs font-medium px-4 py-2 rounded-lg border border-[#3C3F46] text-[#BFC3C9] no-underline hover:border-[#6BA3D6] transition-colors">GitHub</a>}
                  <button onClick={() => toggle(app._id)} className="text-xs font-medium px-4 py-2 rounded-lg border border-[#3C3F46] text-[#BFC3C9] bg-transparent cursor-pointer hover:border-[#6BA3D6] transition-colors">
                    {open ? "Less ↑" : "Details ↓"}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {open && (
              <div className="border-t border-[#3C3F46] bg-[#171f2b] p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

                {u.bio && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6BA3D6] mb-3">Bio</p>
                    <p className="text-sm text-[#BFC3C9] leading-relaxed">{u.bio}</p>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6BA3D6] mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((sk,i) => <span key={i} className="text-xs font-medium bg-[#3C3F46] text-[#BFC3C9] px-3 py-1.5 rounded-lg">{sk}</span>)}
                    </div>
                  </div>
                )}

                {u.education?.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6BA3D6] mb-3">Education</p>
                    {u.education.map((e,i) => (
                      <div key={i} className="border-l-2 border-[#6BA3D6] pl-3 mb-3">
                        <p className="text-sm font-semibold text-white">{e.degree}</p>
                        <p className="text-xs text-[#BFC3C9] mt-0.5">{e.institute}</p>
                        {e.percentage && <p className="text-xs text-[#6BA3D6] mt-0.5">{e.percentage}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {u.experience?.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6BA3D6] mb-3">Experience</p>
                    {u.experience.map((e,i) => (
                      <div key={i} className="border-l-2 border-[#4caf7d] pl-3 mb-3">
                        <p className="text-sm font-semibold text-white">{e.companyName}</p>
                        <p className="text-xs text-[#BFC3C9] mt-0.5">{e.role}</p>
                        <p className="text-xs text-[#BFC3C9] mt-0.5">{e.startDate} – {e.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}