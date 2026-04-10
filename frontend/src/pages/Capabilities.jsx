import { Link } from "react-router-dom";

import { useReveal } from "../hooks/useReveal";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Wrench,
  Cpu,
  Layers,
  Settings,
  FlaskConical,
  Microscope,
  Code2,
  Box,
  Compass,
} from "lucide-react";
import { useState } from "react";
import InquireModal from "../components/InquireModal";

const CAPABILITIES = [
  {
    id: "laser-cutting",
    icon: <Zap size={36} />,
    title: "Laser Cutting",
    subtitle: "High-Precision Fiber Laser Systems",
    desc: "Our high-precision fiber laser cutting systems enable accurate cutting of sheet metal components with tight tolerances and excellent edge quality.",
    keyCapabilities: [
      "Precision cutting of stainless steel, mild steel, and specialty alloys",
      "High accuracy for thin and medium thickness sheets",
      "Burr-free edges minimizing secondary finishing operations",
    ],
    applications: ["Precision sheet metal components", "Structural fabrication parts"],
  },
  {
    id: "cnc-bending",
    icon: <Layers size={36} />,
    title: "CNC Bending",
    subtitle: "CNC Press Brake Technology",
    desc: "Our CNC press brake bending capability ensures high accuracy and consistency in forming operations.",
    keyCapabilities: [
      "CNC controlled bending",
      "Complex multi-bend components",
      "Multi-axis machining for complex geometries",
      "High-speed production with consistent repeatability",
      "Advanced surface finishes and secondary processing",
    ],
    applications: ["Industrial equipment housings", "Structural assemblies"],
  },
  {
    id: "welding",
    icon: <Wrench size={36} />,
    title: "Welding Expertise",
    subtitle: "TIG | MIG | Laser | Orbital | Arc Welding",
    desc: "Welding is one of DFAB's core strengths, supported by qualified welders, controlled procedures, and strong quality practices.",
    keyCapabilities: [
      "TIG welding for stainless steel and precision work",
      "MIG welding for fabrication assemblies",
      "Laser welding for minimal distortion",
      "Orbital welding for pipes and tubular systems",
      "Arc welding for heavy-duty industrial applications",
    ],
    applications: ["Stainless steel fabrication", "Pressure equipment components", "Process industry equipment"],
  },
  {
    id: "cnc-machining",
    icon: <Cpu size={36} />,
    title: "CNC Machining",
    subtitle: "Precision Turning & Milling",
    desc: "DFAB provides precision CNC machining services to produce components with tight tolerances and high dimensional accuracy.",
    keyCapabilities: [
      "Precision turning and milling",
      "Machining of stainless steel and engineering materials",
      "Tight tolerance manufacturing",
      "Custom machined components",
    ],
    applications: ["Precision mechanical components", "Industrial equipment parts", "Custom machined solutions"],
  },
  {
    id: "heavy-fabrication",
    icon: <Settings size={36} />,
    title: "Heavy Fabrication",
    subtitle: "Structural & Industrial Assemblies",
    desc: "We specialize in heavy fabrication of stainless steel and structural assemblies, supported by experienced engineers and skilled fabrication teams.",
    keyCapabilities: [
      "Large structural assemblies",
      "Thick material welding",
      "Industrial equipment structures",
      "Heavy-duty fabricated components",
    ],
    applications: ["Industrial machinery frames", "Process equipment structures", "Custom engineered fabrication solutions"],
  },
  {
    id: "assembly-testing",
    icon: <FlaskConical size={36} />,
    title: "High Precision Assembly & Testing",
    subtitle: "Complete Assembly & Functional Verification",
    desc: "DFAB provides complete assembly and functional testing to ensure that manufactured systems meet customer requirements and perform reliably.",
    keyCapabilities: [
      "Mechanical assembly of complex systems",
      "Leak testing and pressure testing",
      "Dimensional verification",
      "Functional testing",
    ],
    applications: ["Industrial equipment systems", "Process equipment modules", "Precision engineered assemblies"],
  },
];

const RD_ROLES = [
  { title: "Designing", dept: "CAD/CAM & 3D Prototyping", icon: <Compass size={20} /> },
  { title: "Research", dept: "Material Science & Analysis", icon: <Microscope size={20} /> },
  { title: "Product Development", dept: "Lifecycle & Strategy", icon: <Box size={20} /> },
  { title: "Software Engineer", dept: "Digital Systems & IoT", icon: <Code2 size={20} /> },
];

function CapabilityCard({ cap }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#0A66C2] hover:shadow-xl transition-all reveal h-full flex flex-col group">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-[#0A66C2] shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors duration-300">
          {cap.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-['Chivo'] tracking-tight">{cap.title}</h3>
          <p className="text-[10px] font-black text-[#0A66C2] uppercase tracking-widest mt-1">{cap.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">{cap.desc}</p>
      <div className="mb-6">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Capabilities</p>
        <ul className="space-y-2">
          {cap.keyCapabilities.map((k) => (
            <li key={k} className="flex gap-2 text-sm text-slate-700 font-medium">
              <CheckCircle size={14} className="text-[#0A66C2] shrink-0 mt-0.5" />
              {k}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-5 border-t border-slate-50">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Applications</p>
        <div className="flex flex-wrap gap-2">
          {cap.applications.map((a) => (
            <span key={a} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const [showInquire, setShowInquire] = useState(false);
  const capRef = useReveal();
  const rdRef = useReveal();

  return (
    <main className="bg-white">
      {/* HEADER SECTION */}
      <section className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo'] animate-fade-in">Manufacturing Capabilities</h1>
          <p className="text-slate-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
            Precision-driven manufacturing capabilities built on global standards, featuring advanced fiber laser cutting and specialized welding.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Capabilities</span>
          </div>
        </div>
      </section>

      {/* STICKY QUICK NAVIGATION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 whitespace-nowrap justify-center md:justify-start">
            {CAPABILITIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 rounded-full hover:bg-[#0A66C2] hover:text-white transition-all border border-slate-100">{c.title}</a>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILED CAPABILITIES CARDS */}
      <section className="py-20 md:py-28" ref={capRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-[0.2em]">Expertise</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">End-to-End Manufacturing Solutions</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {CAPABILITIES.map((cap) => (
              <div key={cap.id} id={cap.id} className="h-full scroll-mt-28">
                <CapabilityCard cap={cap} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ UNIQUE R&D AND INNOVATION SECTION (With Elevator Boxes & Custom Roles) */}
      <section className="py-28 bg-[#0F172A] relative overflow-hidden" ref={rdRef}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0A66C2]/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* LEFT CONTENT AREA */}
            <div className="lg:w-1/2 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#0A66C2]/20">
                <Microscope size={14} className="animate-bounce-slow" />
                Technical Innovation Hub
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Chivo'] leading-tight">
                Research & <span className="text-[#0A66C2]">Development</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Innovation is the bridge between complex concepts and industrial reality. Our R&D division focuses on value engineering to reduce cost while enhancing structural integrity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {[
                  { label: "Simulated Stress Analysis", icon: <Settings size={18} /> },
                  { label: "Rapid Prototype Cycles", icon: <Zap size={18} /> },
                  { label: "Design for Manufacturing", icon: <Compass size={18} /> },
                  { label: "Digital Monitoring", icon: <Code2 size={18} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-slate-300 font-bold text-sm tracking-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: FOUR UNIQUE ROLE BOXES (Elevator Animation) */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full reveal">
              {RD_ROLES.map((role, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-[#0A66C2] shadow-[0_0_20px_#0A66C2] transition-transform duration-700 -translate-y-full group-hover:translate-y-0"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-[20%] bg-white/20"></div>

                  <div className="text-[#0A66C2] mb-4 group-hover:scale-110 transition-transform duration-500">
                    {role.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#0A66C2] transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                    {role.dept}
                  </p>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#0A66C2]/5 rounded-full blur-xl group-hover:bg-[#0A66C2]/20 transition-all"></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}} />
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 font-['Chivo']">Build with Precision</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Partner with an engineering team that understands the intersection of quality, durability, and digital innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowInquire(true)}
              className="px-8 py-4 bg-[#0A66C2] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#084e96] transition-all shadow-xl shadow-blue-100 flex items-center gap-3"
            >
              Start Inquiry <ArrowRight size={18} />
            </button>
            <Link to="/contact" className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </main>
  );
}

// Add the missing imports for the icons used in the grid
