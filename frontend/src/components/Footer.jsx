import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-700">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="font-bold text-2xl text-white font-['Chivo']">DFAB</span>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Stainless System Pvt Ltd</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ISO 9001:2015 certified precision fabrication company. End-to-end solutions in equipment fabrication & machining.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.youtube.com/channel/UClfxW0cBkQMjoU3VdhVv-cg" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Capabilities", "/capabilities"],
                ["Projects", "/projects"],
                ["Infrastructure", "/infrastructure"],
                ["Quality & Certifications", "/quality"],
                ["Careers", "/careers"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-[#0A66C2] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Capabilities</h4>
            <ul className="space-y-2.5">
              {[
                "Laser Cutting",
                "CNC Bending",
                "Welding (TIG/MIG/Orbital)",
                "CNC Machining",
                "Heavy Fabrication",
                "Assembly & Testing",
                "Pressure Vessels",
                "Pipeline Fabrication",
              ].map((s) => (
                <li key={s}>
                  <Link to="/capabilities" className="text-sm text-slate-400 hover:text-[#0A66C2] transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  No: 3B/415, No-8 KIADB Main Road, 1st Stage, 2nd Phase, Peenya Industrial Area, Bengaluru – 560058
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                <a href="tel:+918043748186" className="text-sm text-slate-400 hover:text-white transition-colors">
                  080 43748186
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                <a href="mailto:info@dfab.in" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@dfab.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <p>© 2024 DFAB Stainless System Pvt Ltd. All rights reserved.</p>
          <p>ISO 9001:2015 · ZED Certified · ADNOC Approved | Peenya Industrial Area, Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
