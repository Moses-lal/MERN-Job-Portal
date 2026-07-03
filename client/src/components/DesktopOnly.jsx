import { useEffect, useState } from "react";
import { MdOutlineDesktopMac } from "react-icons/md";
import { MdOutlineSmartphone } from "react-icons/md";


const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) return children;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black blur-sm scale-110 opacity-90"></div>

      {/* Center Card */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">

          <div className="flex justify-center mb-6">
            <div className="relative">
              <MdOutlineDesktopMac size={70} className="text-white" />
              <MdOutlineSmartphone
                size={34}
                className="absolute -bottom-2 -right-2 text-red-700"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Desktop Recommended
          </h1>

          <p className="text-gray-300 leading-7">
            HustleShala is a heavy website currently optimized for desktop and laptop
            screens.
          </p>

          <p className="text-gray-400 mt-3 text-sm">
            Mobile support is under development.
          </p>

          <div className="mt-8 border-t border-white/20 pt-5">
            <p className="text-gray-400 text-sm">
              Please visit using a desktop browser for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopOnly;