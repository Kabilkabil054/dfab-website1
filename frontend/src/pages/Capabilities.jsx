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
    applications: [
      "Precision sheet metal components",
      "Structural fabrication parts",
    ],
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
    applications: [
      "Stainless steel fabrication",
      "Pressure equipment components",
      "Process industry equipment",
    ],
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
    applications: [
      "Precision mechanical components",
      "Industrial equipment parts",
      "Custom machined solutions",
    ],
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
    applications: [
      "Industrial machinery frames",
      "Process equipment structures",
      "Custom engineered fabrication solutions",
    ],
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
    applications: [
      "Industrial equipment systems",
      "Process equipment modules",
      "Precision engineered assemblies",
    ],
  },
];

const TEAM_MEMBERS = [
  {
    name: "[Name 1]",
    department: "[Department / Role 1]",
  },
  {
    name: "[Name 2]",
    department: "[Department / Role 2]",
  },
  {
    name: "[Name 3]",
    department: "[Department / Role 3]",
  },
  {
    name: "[Name 4]",
    department: "[Department / Role 4]",
  },
];

function CapabilityCard({ cap }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-7 hover:border-[#0A66C2] hover:shadow-md transition-all reveal h-full flex flex-col">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center text-[#0A66C2] shrink-0">
          {cap.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-['Chivo']animate-fade-up">
            {cap.title}
          </h3>
          <p className="text-xs text-[#0A66C2] uppercase tracking-wide mt-1">
            {cap.subtitle}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{cap.desc}</p>

      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Key Capabilities
        </p>
        <ul className="space-y-1.5">
          {cap.keyCapabilities.map((k) => (
            <li key={k} className="flex gap-2 text-sm text-slate-700">
              <CheckCircle
                size={14}
                className="text-[#0A66C2] shrink-0 mt-0.5"
              />
              {k}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Applications
        </p>
        <div className="flex flex-wrap gap-2">
          {cap.applications.map((a) => (
            <span
              key={a}
              className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const [showInquire, setShowInquire] = useState(false);
  const capRef = useReveal();

  return (
    <main className="bg-white">
      {/* HEADER */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            What We Do
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Manufacturing Capabilities
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Precision-driven manufacturing capabilities for global standards.
          </p>

          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Capabilities</span>
          </div>
        </div>
      </div>

      {/* UPDATED NAVIGATION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {CAPABILITIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-[#0A66C2] hover:text-white transition"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARDS */}
      <section className="py-16 md:py-24" ref={capRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
              Detailed Capabilities
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
              End-to-End Manufacturing Solutions
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Each capability is backed by qualified engineers, calibrated equipment, and strict quality procedures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {CAPABILITIES.map((cap) => (
              <div key={cap.id} id={cap.id} className="h-full">
                <CapabilityCard cap={cap} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN R&D AND INNOVATION TEAM SECTION */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Top Title Area */}
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A66C2] rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <Microscope size={14} />
              In-House Expertise
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-['Chivo']">
              Research & Development
            </h2>
            
            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Innovation is at the core of DFAB Stainless System. Our dedicated engineering team works closely with clients to transition complex ideas from initial concept to full-scale production. By leveraging advanced prototyping and rigorous testing, we continuously develop custom engineering solutions that reduce cost without compromising quality.
            </p>
          </div>

          {/* Clean Animated Team Grid (No Images) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            {TEAM_MEMBERS.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-slate-200 p-8 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#0A66C2]"
              >
                {/* Animated Left Accent Line */}
                <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#0A66C2] transition-all duration-300 ease-out group-hover:h-full"></div>
                
                {/* Content */}
                <div className="pl-2">
                  <h4 className="text-xl font-bold text-slate-900 font-['Chivo'] group-hover:text-[#0A66C2] transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-2">
                    {member.department}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 font-['Chivo']">
            Need a Custom Manufacturing Solution?
          </h2>

          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Tell us your requirements and our team will help engineer the right solution.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowInquire(true)}
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
            >
              Inquire Now <ArrowRight size={16} />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#0A66C2] text-[#0A66C2] px-6 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </main>
  );
}