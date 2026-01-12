import React, { useMemo, useState } from "react";
import api from "../../config/api";
import { toast } from "react-hot-toast";

const AddNewJobModal = ({ isOpen, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    workType: "",
    experienceLevel: "",
    skills: "",
    lastDateToApply: "",
    noOfOpenings: "",
  });
  const [errors, setErrors] = useState({});

  const jobTypeOptions = useMemo(
    () => ["Full-time", "Part-time", "Contract", "Internship", "Project-based"],
    []
  );
  const workTypeOptions = useMemo(() => ["On-site", "Remote", "Hybrid"], []);
  const experienceOptions = useMemo(
    () => ["Entry-level", "Mid-level", "Senior-level", "Director", "Executive"],
    []
  );

  if (!isOpen) return null;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    const required = [
      "title",
      "description",
      "company",
      "location",
      "salary",
      "jobType",
      "workType",
      "experienceLevel",
      "skills",
      "lastDateToApply",
      "noOfOpenings",
    ];
    required.forEach((k) => {
      if (!String(form[k] ?? "").trim()) er[k] = "Required";
    });
    if (form.salary && Number.isNaN(Number(form.salary)))
      er.salary = "Must be a number";
    if (form.noOfOpenings && Number.isNaN(Number(form.noOfOpenings)))
      er.noOfOpenings = "Must be a number";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // API call to create job can be added here

      const res = await api.post("/recruiter/add-new-job", form);
      toast.success(res.data.message);
      onClose?.();
      // Reset form after close
      setForm({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        workType: "",
        experienceLevel: "",
        skills: "",
        lastDateToApply: "",
        noOfOpenings: "",
      });
    } catch (error) {
      console.error("Error creating job:", error);
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 " onClick={onClose} />
      <div className="relative max-h-[80vh] bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-lg border border-gray-200 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add New Job</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {/* Title */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={onChange}
              className={`w-full rounded-lg border ${
                errors.title ? "border-red-400" : "border-gray-300"
              } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
              placeholder="e.g. Frontend Developer"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="company"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.company ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="e.g. Acme Inc."
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.location ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="City, Country"
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                value={form.salary}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.salary ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="e.g. 120000"
              />
              {errors.salary && (
                <p className="mt-1 text-xs text-red-500">{errors.salary}</p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="jobType"
              >
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={form.jobType}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.jobType ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300`}
              >
                <option value="" disabled>
                  Choose...
                </option>
                {jobTypeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.jobType && (
                <p className="mt-1 text-xs text-red-500">{errors.jobType}</p>
              )}
            </div>

            {/* Work Type */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="workType"
              >
                Work Type
              </label>
              <select
                id="workType"
                name="workType"
                value={form.workType}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.workType ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300`}
              >
                <option value="" disabled>
                  Choose...
                </option>
                {workTypeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.workType && (
                <p className="mt-1 text-xs text-red-500">{errors.workType}</p>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="experienceLevel"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.experienceLevel ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300`}
              >
                <option value="" disabled>
                  Choose...
                </option>
                {experienceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.experienceLevel && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.experienceLevel}
                </p>
              )}
            </div>

            {/* No of Openings */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="noOfOpenings"
              >
                No. of Openings
              </label>
              <input
                id="noOfOpenings"
                name="noOfOpenings"
                type="number"
                value={form.noOfOpenings}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.noOfOpenings ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="e.g. 3"
              />
              {errors.noOfOpenings && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.noOfOpenings}
                </p>
              )}
            </div>

            {/* Last Date To Apply */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="lastDateToApply"
              >
                Last Date to Apply
              </label>
              <input
                id="lastDateToApply"
                name="lastDateToApply"
                type="date"
                value={form.lastDateToApply}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.lastDateToApply ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
              />
              {errors.lastDateToApply && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastDateToApply}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="skills"
              >
                Skills (comma separated)
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                value={form.skills}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.skills ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="e.g. React, Node.js, MongoDB"
              />
              {errors.skills && (
                <p className="mt-1 text-xs text-red-500">{errors.skills}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="description"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={form.description}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.description ? "border-red-400" : "border-gray-300"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
                placeholder="Describe responsibilities, requirements, etc."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewJobModal;