import React, { useEffect, useState } from "react";
import { RxLinkedinLogo, RxGithubLogo, RxInstagramLogo } from "react-icons/rx";
import { RiTwitterXLine } from "react-icons/ri";
import { TbWorldWww } from "react-icons/tb";
import { FcCamera } from "react-icons/fc";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authcontext";
import UpdateProfileModal from "../RecruiterDashboard/UpdateProfile";


const Profile = () => {

  const { user, setuser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const [preview, setPreview] = useState("");

  const handlePreview = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const res = await api.patch("/user/changePhoto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      sessionStorage.setItem("userData", JSON.stringify(res.data.data));
      setuser(res.data.data);
      setPreview("");
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );

      setTimeout(() => {
        setPreview("");
      }, 5000);
    }
  };

  useEffect(() => {
    setLoading(!user);
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
      <div className=" flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-2">
            Please login first
          </h2>
          <p className="text-sm text-gray-500">
            Your session has no user data.
          </p>
        </div>
      </div>
    );
  }

  const statItems = [
    { label: "Email", value: user.email || "N/A" },
    { label: "Phone", value: user.phone || "N/A" },
    { label: "Gender", value: user.gender.toUpperCase() || "N/A" },
    { label: "DOB", value: user.dob || "N/A" },
  ];

  return (
    <>
      <div className="bg-gray-50 py-8 px-4 h-full">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 ease-out hover:shadow-md hover:shadow-[#165998]">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                <img
                  src={preview || user.photo}
                  alt={user.fullName}
                  className="w-32 h-32 object-cover rounded-2xl ring-4 ring-gray-100"
                />
                <label
                  htmlFor="dp"
                  className="absolute bottom-0 right-0 border-l border-t border-[var(--secondary)] p-1 rounded-br-xl rounded-tl-xl text-lg bg-[var(--primary)] hover:bg-[var(--tertiary)]"
                >
                  <FcCamera />
                </label>
                <input
                  type="file"
                  name="dp"
                  id="dp"
                  className="hidden"
                  onChange={handlePreview}
                />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[var(--primary)] tracking-tight">
                    {user.fullName}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Recruiter Profile
                  </p>
                </div>
                <div>
                  <button
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                    onClick={() => setUpdateModalOpen(true)}
                  >
                    Update Profile
                  </button>
                  <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg ml-2">
                    Reset Password
                  </button>
                </div>
              </div>
              <div className="flex justify-around">
                {statItems.map((s) => (
                  <div
                    key={s.label}
                    className="bg-gray-100 rounded-lg min-w-40 px-3 py-3 flex flex-col justify-center items-center "
                  >
                    <div className="text-xs uppercase text-gray-500 font-medium">
                      {s.label}
                    </div>
                    <div className="text-sm font-semibold text-[var(--primary)] mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:shadow-[#165998]">
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  {user.companyName}
                </h2>
                <h3 className="text-md  text-[var(--secondary)] mb-4">
                  {user.companyDetail}
                </h3>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-5">
                    <span className="text-[var(--secondary)]">
                      Company Since:
                    </span>
                    <span>{user.companySince}</span>
                  </div>
                  <div className="flex gap-5">
                    <span className="text-[var(--secondary)]">
                      Total Employees:
                    </span>
                    <span>{user.companyEmployees}</span>
                  </div>
                </div>
              </section>
              <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:shadow-[#165998]">
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Company Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {user.companyDescription ||
                    "This user hasn't added a summary yet."}
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:shadow-[#165998]">
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Official Contact
                </h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <span className="font-medium text-[var(--primary)]">
                      Email:
                    </span>{" "}
                    {user.companyEmail}
                  </li>
                  <li>
                    <span className="font-medium text-[var(--primary)]">
                      Phone:
                    </span>{" "}
                    {user.companyPhone || "N/A"}
                  </li>
                  <li>
                    <span className="font-medium text-[var(--primary)]">
                      Address:
                    </span>{" "}
                    {user.companyAddress || "N/A"}
                  </li>
                </ul>
              </section>
              <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:shadow-[#165998]">
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Socials
                </h2>
                <ul className="flex justify-around">
                  <li>
                    <a
                      href={user.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 text-[var(--secondary)] text-lg"
                    >
                      <RxLinkedinLogo />
                    </a>
                  </li>
                  <li>
                    <a
                      href={user.companyWebsite || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black text-[var(--secondary)] text-lg"
                    >
                      <TbWorldWww />
                    </a>
                  </li>
                  <li>
                    <a
                      href={user.insta || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-500 text-[var(--secondary)] text-lg"
                    >
                      <RxInstagramLogo />
                    </a>
                  </li>
                  <li>
                    <a
                      href={user.twitter || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black text-[var(--secondary)] text-lg"
                    >
                      <RiTwitterXLine />
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      />
    </>
  );
};

export default Profile;