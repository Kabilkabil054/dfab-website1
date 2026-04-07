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
        data-testid="navbar"
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-lg" : "border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
            <img
              src={logo}
              alt="DFAB Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl text-[#0A66C2] font-['Chivo'] group-hover:text-[#084e96] transition-colors">
                
              </span>
              <span className="text-[15px] text-gray-800 uppercase tracking-widest">
  Stainless System Pvt Ltd


                <span className="text-[10px] ml-1 align-top">™</span>
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`px-2.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
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
              className="ml-4 bg-[#0A66C2] text-white px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#084e96] transition-all hover:-translate-y-0.5 hover:shadow-md"
              data-testid="nav-inquire-now"
            >
              Inquire Now
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 shadow-lg"
            data-testid="mobile-menu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
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
              className="block w-full bg-[#0A66C2] text-white text-center px-5 py-3 text-sm font-semibold rounded-lg mt-2"
              data-testid="nav-inquire-now-mobile"
            >
              Inquire Now
            </button>
          </div>
        )}
      </header>

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </>
  );
}