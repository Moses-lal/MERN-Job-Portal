import React from "react";
import {
  MdCampaign, MdCode, MdDesignServices, MdGroups,
  MdSecurity, MdBusinessCenter, MdManageAccounts, MdAccountBalance,
  MdArrowForward, MdVerified, MdSpeed, MdLock, MdCloud, MdDevices, MdSupportAgent
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube
} from "react-icons/fa";

const About = () => {

  const navigate = useNavigate();
  const categories = [
    { id: 1, title: "Marketing", count: "58 Jobs Available", icon: <MdCampaign /> },
    { id: 2, title: "Development", count: "48 Jobs Available", icon: <MdCode /> },
    { id: 3, title: "UI/UX Design", count: "78 Jobs Available", icon: <MdDesignServices />, active: true },
    { id: 4, title: "Human Research", count: "120 Jobs Available", icon: <MdGroups /> },
    { id: 5, title: "Security", count: "90 Jobs Available", icon: <MdSecurity /> },
    { id: 6, title: "Business", count: "31 Jobs Available", icon: <MdBusinessCenter /> },
    { id: 7, title: "Management", count: "52 Jobs Available", icon: <MdManageAccounts /> },
    { id: 8, title: "Finance", count: "80 Jobs Available", icon: <MdAccountBalance /> },
  ];

  return (
    <div className="min-h-screen w-full bg-[#090f1a] px-6 md:px-20 py-20">


{/* Header */}
<div className="relative mb-28 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#12372f] via-[#163f36] to-[#102d28] px-8 md:px-14 py-14 md:py-20">

  
  <div className="absolute right-[-120px] top-[-80px] w-[500px] h-[500px] rounded-full border-[70px] border-emerald-700/10 rotate-45" />

  
  <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10 relative z-10">
    <span className="text-[11px] tracking-widest uppercase text-emerald-300 font-semibold">
      Why Hustle World?
    </span>
  </div>

  
  <h1 className="relative z-10 text-white text-5xl md:text-7xl font-light leading-[1.1] max-w-4xl">
    Find your perfect job
    <br />
    & grow your career
    <br />
    with us
  </h1>

  
  <p className="relative z-10 mt-8 max-w-2xl text-slate-300 text-lg leading-8">
    Discover opportunities, connect with recruiters, and build a career
    through one modern platform designed to make job searching easier.
  </p>

  
  <div className="relative z-10 flex flex-wrap gap-4 mt-10">

    <button
      onClick={() => navigate("/register")}
      className="bg-emerald-400 text-[#0f221d] px-7 py-3 rounded-full font-semibold hover:scale-105 transition"
    >
      Join Now
    </button>

    <button
      onClick={() => navigate("/jobs")}
      className="border border-white/10 text-white px-7 py-3 rounded-full hover:border-emerald-400 transition"
    >
      Explore Jobs
    </button>

  </div>
</div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Our Story</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
            Our Journey, <br />
            <span className="text-emerald-400">Simply Explained</span>
          </h2>

          
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20 mb-8">
            <img
              src="/network.webp"
              alt="Connected network of people"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090f1a] via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-emerald-400/10 rounded-3xl" />
          </div>

          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">2024</p>
              <p className="text-sm text-slate-400 mt-1">Founded</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">1,80,570</p>
              <p className="text-sm text-slate-400 mt-1">Jobs Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12,400+</p>
              <p className="text-sm text-slate-400 mt-1">Active Members</p>
            </div>
          </div>
        </div>

        
        <div className="text-slate-400 text-base leading-relaxed space-y-5 mt-25">
          <p>
            Hustle World was founded in <span className="text-white font-semibold">2024</span>, born
            from a simple observation — job hunting had become overwhelming, scattered across endless
            platforms, with no real sense of community behind it.
          </p>

          <p>
            We looked at the job market and saw talented people getting lost in noise — outdated listings,
            disconnected applications, and platforms that felt cold and transactional. Something needed
            to change.
          </p>

          <p>
            So we built a platform that brings <span className="text-white font-semibold">opportunities,
            community, and growth</span> together in one place. Every feature — from trending job feeds
            to curated categories — is designed to make the search feel personal again.
          </p>

          <p>
            Today, Hustle World connects thousands of professionals with <span className="text-white font-semibold">
            verified companies</span> across design, development, marketing, and beyond — helping people
            not just find a job, but find where they truly belong.
          </p>
        </div>
      </div>

      
      <div className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            One Platform <span className="text-emerald-400">Many Solutions</span>
          </h2>
          <button className="text-sm font-medium text-white hover:text-emerald-400 transition-colors flex items-center gap-1">
            See All Platform <MdArrowForward />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-4 border transition-all cursor-pointer
                ${cat.active
                  ? "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-900/40"
                  : "bg-white/5 border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.07]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`text-xl shrink-0 ${cat.active ? "text-[#090f1a]" : "text-emerald-400"}`}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className={`font-semibold leading-snug truncate ${cat.active ? "text-[#090f1a]" : "text-white"}`}>
                    {cat.title}
                  </p>
                  <p className={`text-xs ${cat.active ? "text-[#0f1e17]" : "text-slate-400"}`}>
                    {cat.count}
                  </p>
                </div>
              </div>
              <MdArrowForward className={`shrink-0 ${cat.active ? "text-[#090f1a]" : "text-slate-400"}`} />
            </div>
          ))}
        </div>
      </div>

      
      <div className="relative bg-gradient-to-br from-[#1E2A38]/95 via-[#16202c]/90 to-[#0f1720]/95 border border-white/10 rounded-3xl px-6 md:px-12 py-14 text-center overflow-hidden mt-16">

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Never Want to Miss Any <br />
            <span className="text-emerald-400">Job News?</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base mt-4">
            Subscribe to stay up-to-date on insights, events and new opportunities.
            <br className="hidden md:block" /> You can unsubscribe at any time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 mt-8 max-w-xl mx-auto rounded-full overflow-hidden border border-white/10">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:flex-1 bg-white/5 text-white placeholder-slate-500 px-6 py-4 outline-none border-none"
            />
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 transition-colors text-[#090f1a] font-semibold px-8 py-4 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-16">

        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-6 bg-emerald-400 rounded-sm" />
            <span className="text-white font-bold text-xl tracking-wide">HUSTLE WORLD</span>
          </div>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Connect, grow, and thrive together.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">About</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Press</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Partners</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Jobs</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Browse Jobs</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Job Referrals</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Us</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Help</li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Resources</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Help & Support</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Affiliate</li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Terms</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex gap-3">
          {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-pointer"
            >
              <Icon size={14} />
            </div>
          ))}
        </div>

        <div className="flex gap-6 text-sm text-slate-400">
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">Support</span>
        </div>

        <p className="text-slate-500 text-sm">© Copyright Hustle World. All Rights Reserved</p>
      </div>

    </div>
  );
};

export default About;