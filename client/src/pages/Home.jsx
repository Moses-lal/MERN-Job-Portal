import React, { useEffect, useRef, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
     setTimeout(() => navigate("/login"), 3000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: Math.random() * 100 + 40,
      speed: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.6 + 0.2,
      trail: Math.random() * 1.5 + 0.5,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.45);
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * 0.45);
        grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.trail;
        ctx.stroke();
        s.x += s.speed;
        s.y += s.speed * 0.45;
        if (s.x > canvas.width + s.len || s.y > canvas.height + s.len) {
          s.x = Math.random() * canvas.width * 0.7;
          s.y = Math.random() * canvas.height * 0.4 - s.len;
          s.opacity = Math.random() * 0.6 + 0.2;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const jobs = [
    {
      id: 1, title: "Senior UI Designer", company: "Microsoft",
      desc: "Take advantage of a rare opportunity..", salary: "$20K", bg: "bg-white/5",
      logo: (
        <div className="grid grid-cols-2 gap-0.5 p-1.5 bg-white rounded-lg border shrink-0">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-sm" />
        </div>
      ),
    },
    {
      id: 2, title: "Product Designer", company: "Behance",
      desc: "The Sr Product Designer will be responsible for assets..", salary: "$25K", bg: "bg-white/5",
      logo: (
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">Bé</div>
      ),
    },
    {
      id: 3, title: "Marketing Officer", company: "Mailchimp",
      desc: "The Marketing Manager will work as part of a global, creates..", salary: "$15K", bg: "bg-white/5",
      logo: (
        <div className="w-9 h-9 bg-yellow-300 rounded-lg flex items-center justify-center text-lg border border-yellow-400 shrink-0">🐒</div>
      ),
    },
  ];

  return (
    <>
      {/* Toast */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0f1e17] border border-emerald-500/40 shadow-lg shadow-emerald-900/30">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <p className="text-sm text-white">Please <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">login</span> to explore all jobs</p>
          <button onClick={() => setToast(false)} className="text-slate-500 hover:text-white transition-colors ml-2 text-lg leading-none">×</button>
        </div>
      </div>

      <div className="relative min-h-screen w-full overflow-hidden bg-[#090f1a]">

        {/* Shooting stars */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 flex justify-between">

          {/* Left panel */}
          <div className="ml-27 mt-30 backdrop-blur-md h-150 w-180 rounded-3xl p-6 bg-gradient-to-br from-[#1E2A38]/95 via-[#16202c]/90 to-[#0f1720]/95">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#151524]/80 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,255,180,0.08)]">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-70 animate-pulse"></div>
                </div>
                <span className="text-white/90 text-sm font-medium uppercase">Community</span>
              </div>

              <br /><br />

              <div className="text-4xl text-white font-bold">
                Welcome to <div className="mt-1">HUSTLE WORLD</div>
              </div>

              <br />

              <p className="text-lg text-slate-300">
                Be part of something bigger. Connect, grow, and <br /> thrive together.
              </p>

              {/* Search bar & toast */}
              <div className="flex items-center mt-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden px-3 gap-2">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input type="text" placeholder="Job title or keyword" className="flex-1 bg-transparent py-3 text-sm text-white placeholder-slate-500 outline-none border-none" />
                <div className="w-px h-6 bg-white/10" />
                <svg className="w-4 h-4 text-slate-400 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="text" placeholder="New York, USA" className="w-28 bg-transparent py-3 text-sm text-white placeholder-slate-500 outline-none border-none" />
                <button
                  onClick={showToast}
                  className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-sm font-semibold px-5 py-2 rounded-xl ml-1"
                >
                  Search
                </button>
              </div>

              <section className="py-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-md font-semibold text-white">Trending Jobs</p>
                  {/* navigates */}
                  <button
                    onClick={() => navigate("/jobs")}
                    className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                  >
                    See All Jobs →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {jobs.map((job) => (
                    <div key={job.id} className={`${job.bg} rounded-2xl p-2 flex flex-col gap-3 border-2 border-gray-500/10 min-w-0 hover:shadow-sm hover:shadow-slate-500 transition-shadow`}>
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-white leading-snug">{job.title}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            {job.company} <span className="text-blue-500"><MdVerified /></span>
                          </p>
                        </div>
                        {job.logo}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{job.desc}</p>
                      <div className="flex justify-between items-center mt-1">
                        <div>
                          <p className="text-lg font-bold text-white">{job.salary}</p>
                          <p className="text-xs text-gray-400">Monthly</p>
                        </div>
                        <button onClick={showToast} 
                        className="border-2 border-gray-800 text-slate-800 bg-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-800 hover:text-white transition-colors whitespace-nowrap">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* overlay */}
          <div className="relative w-200 h-screen overflow-hidden">
            <img src={"/hero2.jpg"} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090f1a] via-[#090f1a]/60 to-transparent" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;