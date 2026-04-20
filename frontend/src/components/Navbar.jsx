import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import InquireModal from "./InquireModal";
import logo from "../logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "Quality", path: "/quality" },
  { label: "Projects", path: "/projects" },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showInquire, setShowInquire] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md py-1" : "border-b border-slate-100 py-2"
        }`}
      >
        {/* W-FULL container allows buttons to stay at the very edge of the screen */}
        <div className="w-full flex items-center h-14 px-4 md:px-8">
          
          {/* UPDATED LOGO SECTION - This container pushes the logo to match your page content flow */}
          <div className="flex-1">
             <div className="max-w-7xl w-full mx-auto px-20 md:px-33 flex justify-start">
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                  <img
                    src={logo}
                    alt="DFAB Logo"
                    className="h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="flex items-center border-l border-slate-300 pl-3 h-5">
                    <span className="text-[12px] md:text-[14px] font-normal text-gray-700 uppercase tracking-wide whitespace-nowrap">
                      STAINLESS SYSTEM PVT LTD ™
                    </span>
                  </div>
                </Link>
             </div>
          </div>

          {/* NAVIGATION SECTION - Stays pinned to the far right edge */}
          <div className="flex items-center gap-1 xl:gap-2 shrink-0">
            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg ${
                    location.pathname === link.path
                      ? "text-[#0A66C2] bg-blue-50"
                      : "text-slate-500 hover:text-[#0A66C2] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <button
              onClick={() => setShowInquire(true)}
              className="hidden sm:block bg-[#0A66C2] text-white px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#084e96] transition-all hover:shadow-md active:scale-95 whitespace-nowrap ml-4 shadow-sm"
            >
              Inquire Now
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg ml-2"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`xl:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[600px] opacity-100 shadow-2xl py-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-[13px] font-bold uppercase tracking-widest rounded-xl ${
                  location.pathname === link.path
                    ? "text-[#0A66C2] bg-blue-50"
                    : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setShowInquire(true);
              }}
              className="w-full bg-[#0A66C2] text-white py-3.5 text-[13px] font-bold uppercase tracking-widest rounded-xl mt-4"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </header>

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </>
  );
}