import React from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import api from "../../config/api";
import toast from "react-hot-toast";

const ViewJobModal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;

  const [jobDetails, setJobDetails] = React.useState(job || {});
  const [isReadOnly, setIsReadOnly] = React.useState(true);

  React.useEffect(() => {
    setJobDetails(job || {});
  }, [job]);

  const handleUpdateJob = async () => {
    // TODO: call API to persist jobDetails or pass to parent via prop

    try {
      const res = await api.post("/recruiter/update-job", jobDetails);
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if(name ==="lastDateToApply"){
      value = new Date(value).toISOString();
      console.log("Date changed:", value);
    }
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // console.log("Job Details in Modal:", jobDetails);
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white p-4">
            <h2 className="text-2xl font-bold flex items-center gap-5">
              <span>Job Details</span>
              <button
                className="text-gray-500 hover:text-green-500"
                onClick={() => {
                  setIsReadOnly(!isReadOnly);
                  if (!isReadOnly) {
                    console.log("Edit mode disabled, saved changes");
                    handleUpdateJob();
                  }
                }}
              >
                {isReadOnly ? <FaEdit /> : <FaSave />}
              </button>
            </h2>
            <button
              className="text-gray-500 hover:text-red-500 border rounded-full p-3 w-5 h-5 flex items-center justify-center"
              aria-label="Close"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          {job ? (
            <div className="space-y-3 px-6 py-2">
              <div className="grid gap-2">
                <label htmlFor="title">Job Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={jobDetails.title ?? ""}
                  readOnly={isReadOnly}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly
                      ? "border-gray-300 bg-gray-100 focus:outline-none"
                      : "border"
                  }`}
                  onChange={handleChange}
                />

                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={jobDetails.company ?? ""}
                  readOnly={isReadOnly}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly
                      ? "border-gray-300 bg-gray-100 focus:outline-none"
                      : "border"
                  }`}
                  onChange={handleChange}
                />

                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={jobDetails.location ?? ""}
                  readOnly={isReadOnly}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="salary">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      id="salary"
                      value={jobDetails.salary ?? ""}
                      readOnly={isReadOnly}
                      className={`w-full p-2 rounded mt-1 mb-2 ${
                        isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                      }`}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="noOfOpenings">No. of Openings</label>
                    <input
                      type="number"
                      name="noOfOpenings"
                      id="noOfOpenings"
                      value={jobDetails.noOfOpenings ?? ""}
                      readOnly={isReadOnly}
                      className={`w-full p-2 rounded mt-1 mb-2 ${
                        isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                      }`}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <label htmlFor="jobType">Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={jobDetails.jobType ?? ""}
                  disabled={isReadOnly}
                  onChange={handleChange}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                >
                  <option value="">Select</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Project-based</option>
                </select>

                <label htmlFor="workType">Work Type</label>
                <select
                  id="workType"
                  name="workType"
                  value={jobDetails.workType ?? ""}
                  disabled={isReadOnly}
                  onChange={handleChange}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                >
                  <option value="">Select</option>
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>

                <label htmlFor="experienceLevel">Experience Level</label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={jobDetails.experienceLevel ?? ""}
                  disabled={isReadOnly}
                  onChange={handleChange}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                >
                  <option value="">Select</option>
                  <option>Entry-level</option>
                  <option>Mid-level</option>
                  <option>Senior-level</option>
                  <option>Director</option>
                  <option>Executive</option>
                </select>

                <label htmlFor="skills">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={jobDetails.skills ?? ""}
                  readOnly={isReadOnly}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                  onChange={handleChange}
                />

                <label htmlFor="lastDateToApply">Last Date to Apply</label>
                <input
                  type="date"
                  name="lastDateToApply"
                  id="lastDateToApply"
                  value={
                    jobDetails.lastDateToApply
                      ? new Date(jobDetails.lastDateToApply)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  readOnly={isReadOnly}
                  onChange={handleChange}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly ? "border-gray-300 bg-gray-100" : "border"
                  }`}
                />

                <label htmlFor="description">Job Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={jobDetails.description ?? ""}
                  readOnly={isReadOnly}
                  className={`w-full p-2 rounded mt-1 mb-2 ${
                    isReadOnly
                      ? "border-gray-300 bg-gray-100 focus:outline-none"
                      : "border"
                  }`}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <p>No job details available.</p>
          )}
          <div className="p-4 border-t border-[var(--primary)] flex justify-end bg-white sticky bottom-0">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
            {!isReadOnly && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => {
                  setIsReadOnly(true);
                  handleUpdateJob();
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJobModal;