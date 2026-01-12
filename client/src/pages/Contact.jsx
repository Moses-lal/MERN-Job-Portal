import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  
  const [contactData, setcontactData] = useState({
    FullName: " ",
    email: " ",
    Subject: " ",
    Query: " ",
  });

  const [loading, setLoading] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setcontactData((data) => ({ ...data, [name]: value }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      console.log(contactData);

      setcontactData({
        FullName: " ",
        email: " ",
        Subject: " ",
        Query: " ",
      });

      setLoading(false);

      toast.success("registration succesful ");
    }, 2000);
  };

  return (
    <div className="h-200 w-full bg-cyan-500">
      
      
        <div className="p-30 flex">
          <div className="">
            <img
              src={"/contactImage.jpg"}
              alt=""
              className="border-2 border-emerald-700 shadow-2xl shadow-pink-500"
            />
          </div>
          <div className="border w-150 p-5 bg-slate-800">
            <div className="border space-y-10 p-5 rounded-2xl bg-slate-300 shadow-2xl shadow-pink-500">
              <h1 className="text-2xl font-bold">Get In Touch With Us </h1>
              <form onSubmit={HandleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="FullName">FullName</label>
                    <input
                      type="name"
                      id="FullName"
                      name="FullName"
                      className="border"
                      value={contactData.FullName}
                      onChange={HandleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="border"
                      value={contactData.email}
                      onChange={HandleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Subject">Subject:</label>
                    <input
                      type="text"
                      id="Subject"
                      name="Subject"
                      className="border"
                      value={contactData.Subject}
                      onChange={HandleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Query">Your Query</label>
                    <input
                      type="text"
                      id="Query"
                      name="Query"
                      className="border"
                      value={contactData.Query}
                      onChange={HandleChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="border w-50 rounded hover:text-xl hover:bg-blue-500 my-5"
                >
                  { loading ? "Sending..." : "Send Message" }
                </button>
              </form>
            </div>
          </div>
        </div>
      




    </div>
  );
};

export default Contact;
