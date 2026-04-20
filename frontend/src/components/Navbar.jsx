import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-12">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logo}
              alt="DFAB Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[14px] md:text-[16px] font-bold text-gray-900 leading-tight tracking-tight">
                Stainless System Pvt Ltd ™ <span className="text-[#0A66C2]"></span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-medium">
                
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-[13px] font-semibold transition-all duration-200 rounded-lg ${
                  location.pathname === link.path
                    ? "text-[#0A66C2] bg-blue-50"
                    : "text-slate-600 hover:text-[#0A66C2] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={() => setShowInquire(true)}
              className="ml-4 bg-[#0A66C2] text-white px-6 py-2.5 text-sm font-bold rounded-full hover:bg-[#084e96] shadow-sm transition-all active:scale-95"
            >
              Inquire Now
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Smooth Slide CSS */}
        <div
          className={`lg:hidden bg-white border-t border-slate-50 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[600px] opacity-100 shadow-2xl" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                  location.pathname === link.path
                    ? "text-[#0A66C2] bg-blue-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
                <ChevronRight size={16} className={location.pathname === link.path ? "opacity-100" : "opacity-0"} />
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setShowInquire(true);
              }}
              className="w-full bg-[#0A66C2] text-white text-center py-4 text-base font-bold rounded-xl mt-4"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </header>

      {/* NO SPACER DIV HERE - REMOVED AS REQUESTED */}

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </>
  );
}