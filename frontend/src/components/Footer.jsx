import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter,
  Clock,
  MessageCircle
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] text-slate-300 pt-20 pb-10 overflow-hidden border-t border-slate-800/50">
      <style>
        {`
          /* 1. Background Grid */
          .blueprint-grid {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(10, 102, 194, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 102, 194, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            animation: grid-pulse 8s ease-in-out infinite alternate;
          }
          @keyframes grid-pulse {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.02); }
          }
          
          .grid-mask {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 100%, transparent 0%, #020617 80%);
            z-index: 1;
            pointer-events: none;
          }

          /* 2. Plasma Cutter Animation */
          .plasma-track {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(255,255,255,0.05);
            z-index: 10;
            overflow: hidden;
          }
          .plasma-head {
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(10,102,194,0.8), #ffffff);
            box-shadow: 0 0 15px 3px #0A66C2, 0 0 30px 8px #0A66C2;
            animation: plasma-cut 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          @keyframes plasma-cut {
            0% { left: -150px; opacity: 0; }
            10% { opacity: 1; }
            40% { left: 40%; }
            50% { left: 40%; box-shadow: 0 0 25px 8px #fff, 0 0 40px 15px #0A66C2; } 
            90% { left: 100%; opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }

          /* 3. Titanium Blue Text */
          .titanium-blue-text {
            background: linear-gradient(to right, #0A66C2 0%, #60A5FA 20%, #E0F2FE 40%, #60A5FA 60%, #0A66C2 100%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: blue-metal-shine 2.5s linear infinite;
            text-shadow: 0 0 30px rgba(10, 102, 194, 0.4);
          }
          @keyframes blue-metal-shine { to { background-position: 200% center; } }

          /* 4. SOCIAL MEDIA BOOM EFFECT */
          .control-btn {
            position: relative;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(10, 102, 194, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .control-btn:hover {
            transform: scale(1.25);
            background: #0A66C2;
            color: white;
            border-color: #60A5FA;
            box-shadow: 0 0 20px 5px rgba(10, 102, 194, 0.6), 0 0 40px 10px rgba(10, 102, 194, 0.3);
            z-index: 30;
          }

          /* 5. WELDING SPARKLE / LIGHTNING BORDER */
          .welding-sparkle-card {
            position: relative;
            border: 1px solid transparent;
            transition: all 0.3s ease;
          }
          .welding-sparkle-card:hover {
            border-color: #60A5FA;
            background: rgba(10, 102, 194, 0.1);
            box-shadow: inset 0 0 10px rgba(10, 102, 194, 0.2);
          }
          .welding-sparkle-card:hover::before {
            content: '';
            position: absolute;
            inset: -2px;
            border: 2px solid #0A66C2;
            border-radius: 8px;
            animation: lightning-flicker 0.2s infinite;
            pointer-events: none;
          }
          @keyframes lightning-flicker {
            0% { opacity: 0.5; filter: brightness(1); }
            50% { opacity: 1; filter: brightness(2) drop-shadow(0 0 5px #fff); }
            100% { opacity: 0.5; filter: brightness(1); }
          }

          /* 6. Navigation Link Animation */
          .precision-link {
            position: relative;
            display: inline-flex;
            align-items: center;
            transition: all 0.3s ease;
          }
          .precision-link:hover { color: #ffffff; transform: translateX(8px); }
          .precision-arrow { color: #0A66C2; margin-right: 8px; font-weight: bold; }

          .ui-corners { position: relative; }
          .ui-corners::before { content: ''; position: absolute; top: -5px; left: -5px; width: 10px; height: 10px; border-width: 1px 0 0 1px; border-color: #0A66C2; border-style: solid; opacity: 0.5; }
          .ui-corners::after { content: ''; position: absolute; bottom: -5px; right: -5px; width: 10px; height: 10px; border-width: 0 1px 1px 0; border-color: #0A66C2; border-style: solid; opacity: 0.5; }
        `}
      </style>

      <div className="blueprint-grid"></div>
      <div className="grid-mask"></div>

      <div className="plasma-track">
        <div className="plasma-head"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5 relative ui-corners p-2">
            <div className="mb-6 flex flex-col items-start">
              <span className="font-bold text-5xl titanium-blue-text font-['Chivo'] tracking-tighter cursor-default">
                DFAB
              </span>
              <div className="h-[2px] w-16 bg-[#0A66C2] mt-2 mb-1"></div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em] mt-1">
                Stainless System Pvt Ltd <sup className="text-[8px] text-[#0A66C2] ml-0.5">&trade;</sup> 
              </p>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-6 pr-4 text-sm">
              From complex CNC machining to heavy structural fabrication, we engineer precision solutions that drive global industries forward.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["ISO 9001:2015", "ZED CERTIFIED", "ADNOC APPROVED"].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-[#020617] border border-slate-700/80 rounded-md text-[9px] font-bold text-slate-300 tracking-widest shadow-inner">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* SOCIAL MEDIA BOOM LINKS */}
            <div className="flex flex-wrap gap-5 pt-2">
              {[
                { Icon: Facebook, url: "https://www.facebook.com" },
                { Icon: Instagram, url: "https://www.instagram.com" },
                { Icon: Youtube, url: "https://www.youtube.com/channel/UClfxW0cBkQMjoU3VdhVv-cg" },
                { Icon: Linkedin, url: "https://www.linkedin.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: MessageCircle, url: "https://wa.me/918428866121" }
              ].map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-slate-400 control-btn outline-none"
                >
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-3 pt-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center">
              <span className="w-2 h-2 bg-[#0A66C2] mr-3 rounded-sm"></span>
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                ["Home", "/"], ["About Us", "/about"], ["Capabilities", "/capabilities"],
                ["Our Projects", "/projects"], ["Infrastructure", "/infrastructure"],
                ["Quality Control", "/quality"], ["Careers", "/careers"], ["Contact Team", "/contact"]
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-slate-400 precision-link font-medium outline-none">
                    <span className="precision-arrow">❯</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (With Sparkle Hover) */}
          <div className="md:col-span-4 pt-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center">
              <span className="w-2 h-2 bg-[#0A66C2] mr-3 rounded-sm"></span>
              Global HQ
            </h4>
            
            <ul className="space-y-3">
              <li className="flex gap-4 items-start welding-sparkle-card p-3 rounded-lg">
                <div className="mt-1 p-2 rounded bg-slate-800/80 text-[#0A66C2]">
                  <MapPin size={18} />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed pt-1">
                  No: 3B/415, No-8 KIADB Main Road, 1st Stage, 2nd Phase, Peenya Industrial Area, Bengaluru – 560058
                </span>
              </li>
              
              <li className="flex gap-4 items-center welding-sparkle-card p-3 rounded-lg group">
                <div className="p-2 rounded bg-slate-800/80 text-[#0A66C2]">
                  <Phone size={18} />
                </div>
                <a href="tel:+918043748186" className="text-sm text-slate-300 font-bold tracking-wide text-lg outline-none">
                  080 43748186
                </a>
              </li>
              
              <li className="flex gap-4 items-center welding-sparkle-card p-3 rounded-lg group">
                <div className="p-2 rounded bg-slate-800/80 text-[#0A66C2]">
                  <Mail size={18} />
                </div>
                <a href="mailto:info@dfab.in" className="text-sm text-slate-300 font-medium outline-none">
                  info@dfab.in
                </a>
              </li>

              <li className="flex gap-4 items-center welding-sparkle-card p-3 rounded-lg group">
                <div className="p-2 rounded bg-slate-800/80 text-[#0A66C2]">
                  <Clock size={18} />
                </div>
                <span className="text-sm text-slate-300 font-medium tracking-wide">
                  Mon - Sat: 9:00 AM - 6:30 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">
          <p>© {currentYear} DFAB STAINLESS SYSTEM PVT LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
              <p className="text-slate-400 uppercase">System: Operational</p>
            </div>
            <span className="text-slate-700">|</span>
            <p className="text-[#0A66C2]">Secured</p>
          </div>
        </div>
      </div>
    </footer>
  );
}