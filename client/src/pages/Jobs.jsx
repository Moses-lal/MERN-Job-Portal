import React from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/jobs");
      setJobs(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <>
      <div className="p-4 min-h-screen bg-[var(--tertiary)] ">
        <h1 className="text-center text-2xl font-bold-">Available Jobs</h1>
        <div className="max-w-5xl mx-auto p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-600">
              No jobs available at the moment.
            </p>
          ) : (
            jobs.map((job) => {
              const company = job.recruiterID || {};
              const skills = job.skills
                ? job.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
              const desc = job.description || "";
              const shortDesc =
                desc.length > 220 ? desc.slice(0, 220) + "..." : desc;
              const posted = job.createdAt
                ? new Date(job.createdAt).toLocaleDateString()
                : "-";

              return (
                <article
                  key={job._id || job.id}
                  className="mb-6 bg-[var(--primary)] rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 ease-out hover:shadow-[#165998] hover:-translate-y-4 hover:scale-[1.05]"
                >
                  <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    <div className="sm:col-span-2 flex items-center">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                        {company.companyName
                          ? company.companyName.charAt(0)
                          : job.title?.charAt(0) || "J"}
                      </div>
                    </div>

                    <div className="sm:col-span-7">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {job.title}
                          </h3>
                          <p className="text-sm text-white mt-1">
                            {job.company || "Unknown Company"} •{" "}
                            <span className="text-gray-400">
                              Posted on : {posted}
                            </span>
                          </p>
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-100">
                            {job.jobType}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                            {job.workType}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-white mt-3">{shortDesc}</p>

                      {skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skills.slice(0, 6).map((sk) => (
                            <span
                              key={sk}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {sk}
                            </span>
                          ))}
                          {skills.length > 6 && (
                            <span className="text-xs text-gray-400">
                              +{skills.length - 6} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-3 flex flex-col items-end justify-between">
                      <div className="text-right grid grid-cols-2 gap-4">
                        <div className="text-sm text-white">Location</div>
                        <div className="text-sm font-medium text-white">
                          {job.location || "Remote"}
                        </div>

                        <div className="text-sm text-white">Salary</div>
                        <div className="text-sm font-semibold text-white">
                          {job.salary ? `₹${job.salary}/month` : "-"}
                        </div>

                        <div className="text-sm text-white">Openings</div>
                        <div className="text-sm font-medium text-white">
                          {job.noOfOpenings || "1"}
                        </div>
                      </div>

                      <div className="mt-4 w-full flex gap-2">
                        <button
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm"
                          onClick={() => navigate("/jobDetails", { state: { selectedJob: job } })}
                        >
                          View More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;