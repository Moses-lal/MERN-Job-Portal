import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime, MdArrowOutward, MdHandshake } from "react-icons/md";

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

  const infoCards = [
    { label: "Address", value: "Remote, Worldwide", icon: <MdLocationOn /> },
    { label: "Email Us", value: "support@hustleworld.com", icon: <MdEmail /> },
    { label: "Call Us", value: "+00 000 00 000", icon: <MdPhone /> },
    { label: "Working Hours", value: "10:00 am - 6:00 pm", icon: <MdAccessTime /> },
  ];

  return (
    <div className="min-h-screen w-full bg-[#090f1a] px-6 md:px-20 py-20">

      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Contact Us</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-white">Let's Start a </span>
          <span className="text-emerald-400">Conversation</span>
        </h1>

        <p className="text-slate-400 text-base mt-4 leading-relaxed">
          Have a question, feedback, or just want to say hi? Drop us a message and our team
          will get back to you as soon as possible.
        </p>
      </div>

      {/* Info cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {infoCards.map((c) => (
          <div
            key={c.label}
            className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 hover:border-emerald-500/30 transition-colors cursor-pointer"
          >
            <div className="min-w-0">
              <p className="text-slate-400 text-xs mb-1">{c.label}</p>
              <p className="text-white text-sm font-medium truncate">{c.value}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
              <MdArrowOutward size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Main contact panel */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left: image + collab card */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-72 md:h-96">
              <img
                src={"/contactImage.jpg"}
                alt="Get in touch"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f1a]/60 via-transparent to-transparent" />
            </div>

            <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mt-4 hover:border-emerald-500/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg shrink-0">
                  <MdHandshake />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-400 text-xs mb-0.5">Partnerships & Collaborations</p>
                  <p className="text-white text-sm font-medium truncate">partners@hustleworld.com</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <MdArrowOutward size={16} />
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-[#0c1322] border border-white/10 rounded-2xl p-6 md:p-8">
            <form onSubmit={HandleSubmit} className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="FullName" className="text-sm text-slate-300 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    id="FullName"
                    name="FullName"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="Enter First Name"
                    value={contactData.FullName}
                    onChange={HandleChange}
                  />
                </div>

                <div>
                  <label htmlFor="Subject" className="text-sm text-slate-300 mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    id="Subject"
                    name="Subject"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="Enter Subject"
                    value={contactData.Subject}
                    onChange={HandleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-slate-300 mb-1.5 block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="Enter your Email"
                  value={contactData.email}
                  onChange={HandleChange}
                />
              </div>

              <div>
                <label htmlFor="Query" className="text-sm text-slate-300 mb-1.5 block">Message</label>
                <textarea
                  id="Query"
                  name="Query"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Enter your Message"
                  value={contactData.Query}
                  onChange={HandleChange}
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-emerald-500" />
                  I agree with Terms of Use and Privacy Policy
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-95 text-[#090f1a] font-semibold px-6 py-3 rounded-full text-sm disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? "Sending..." : "Send your Message"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;