import React from "react";
import AddNewJobModal from "../RecruiterDashboard/AddNewJobModel";
import ViewJobModal from "../RecruiterDashboard/ViewJobModel";
import api from "../../config/api";

const Jobs = () => {
  const [jobs, setJobs] = React.useState([]);

  const [isAddJobModalOpen, setIsAddJobModalOpen] = React.useState(false);
  const [isViewJobModalOpen, setIsViewJobModalOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);

  const handleAddJob = () => {
    console.log("Add New Job button clicked");
    setIsAddJobModalOpen(true);
  };

  const fetchJobs = async () => {
    const res = await api.get("/recruiter/get-posted-jobs");
    setJobs(res.data.data);
  };


   React.useEffect(() => {
    if (!isAddJobModalOpen && !isViewJobModalOpen) fetchJobs();
  }, [isAddJobModalOpen , isViewJobModalOpen]);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between border-b-2 border-[var(--secondary)] pb-4 mb-4 items-center">
          <h1 className="text-2xl font-bold text-[var(--text)]">All Posted Jobs</h1>

          <button
            className="bg-[var(--text)] text-white py-2 px-4 rounded"
            onClick={handleAddJob}
          >
            Add New Job
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            //Create a Card for each job
            jobs.map((job) => (
              <div
                key={job._id}
                className=" p-4 mb-4 rounded shadow-2xl shadow-[#1E2A38] transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#165998]"
                onClick={() => {
                  setSelectedJob(job);
                  setIsViewJobModalOpen(true);
                }}
              >
                <div className="h-50 flex flex-col justify-between ">

                <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600 mb-3">{job.company}</p>

                <p className="text-">{job.description}</p>
                </div>
               
                <div className="flex gap-2 mb-1">

                <button className="border p-2 rounded-xl border-blue-800 shadow-sm shadow-cyan-700">{job.jobType}</button>
                <button className="border p-2 rounded-xl  border-cyan-300  shadow-md shadow-green-500">{job.experienceLevel}</button>
                </div>

                </div>
               
              </div>
            ))
          )}
        </div>
      </div>

      <AddNewJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
      />

      <ViewJobModal
        isOpen={isViewJobModalOpen}
        onClose={() => setIsViewJobModalOpen(false)}
        job={selectedJob}
      />
    </>
  );
};

export default Jobs;