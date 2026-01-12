import React from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch (e) {
    return iso || "-";
  }
};

const statusClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "selected":
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Application = () => {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const fetchAppliedJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/applied-jobs");
      setApplications(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.response?.status} | ${error.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleView = (application) => {
    // navigate to JobDetails with job in state
    navigate("/job-details", { state: { selectedJob: application.jobID } });
  };

  const handleWithdraw = async (id) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return;
    try {
      await api.delete(`/user/applications/${id}`);
      toast.success("Application withdrawn");
      fetchAppliedJobs();
    } catch (error) {
      console.log(error);
      toast.error("Failed to withdraw application");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">My Applications</h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-lg" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No applications found.</div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const company = application.recruiterID || {};
              const job = application.jobID || {};
              return (
                <div key={application._id || job._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {company.photo ? (
                        <img src={company.photo} alt={company.companyName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-lg font-semibold text-gray-600">{(company.companyName || job.company || "").charAt(0)}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{job.title || "-"}</h2>
                        <div className="text-sm text-gray-500">{company.companyName || job.company || "-"}</div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusClass(application.status)}`}>
                          {application.status || "-"}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Applied: {formatDate(application.createdAt || application.appliedAt || job.createdAt)}</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mt-3 line-clamp-2">{job.description || "No description"}</p>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <div className="text-gray-500">Location:</div>
                      <div className="text-gray-800 font-medium">{job.location || "-"}</div>
                      <div className="mx-2 text-gray-300">•</div>
                      <div className="text-gray-500">Salary:</div>
                      <div className="text-gray-800 font-medium">{job.salary ? `₹${job.salary}` : "-"}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleView(application)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">View</button>
                    <button onClick={() => handleWithdraw(application._id)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Withdraw</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;