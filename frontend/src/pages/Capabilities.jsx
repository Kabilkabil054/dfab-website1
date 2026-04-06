import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { ArrowRight, CheckCircle, Zap, Wrench, Cpu, Layers, Settings, FlaskConical } from "lucide-react";
import { useState } from "react";
import InquireModal from "../components/InquireModal";

const CAPABILITIES = [
  {
    id: "laser-cutting",
    icon: <Zap size={36} />,
    title: "Laser Cutting",
    subtitle: "High-Precision Fiber Laser Systems",
    desc: "Our high-precision fiber laser cutting systems enable accurate cutting of sheet metal components with tight tolerances and excellent edge quality. Laser cutting ensures minimal distortion, high repeatability, and faster production for complex geometries.",
    keyCapabilities: [
      "Precision cutting of stainless steel, mild steel, and specialty alloys",
      "High accuracy for thin and medium thickness sheets",
      "Burr-free edges minimizing secondary finishing operations",
      "Capability to produce intricate and complex profiles",
      "Optimized nesting for material utilization and cost efficiency",
    ],
    applications: [
      "Precision sheet metal components",
      "Structural fabrication parts",
      "Data center cooling components",
      "Industrial equipment panels",
      "Custom fabricated assemblies",
    ],
  },
  {
    id: "cnc-bending",
    icon: <Layers size={36} />,
    title: "CNC Bending",
    subtitle: "CNC Press Brake Technology",
    desc: "Our CNC press brake bending capability ensures high accuracy and consistency in forming operations. Advanced bending technology allows us to manufacture complex sheet metal components with tight dimensional control.",
    keyCapabilities: [
      "CNC controlled bending for repeatable accuracy",
      "Complex multi-bend components",
      "High dimensional consistency for assembly",
      "Capability to form stainless steel and structural components",
      "Precision tooling for complex geometries",
    ],
    applications: [
      "Industrial equipment housings",
      "Structural sheet metal assemblies",
      "Brackets, frames, and enclosures",
      "Precision fabricated assemblies",
    ],
  },
  {
    id: "welding",
    icon: <Wrench size={36} />,
    title: "Welding Expertise",
    subtitle: "TIG | MIG | Laser | Orbital | Arc Welding",
    desc: "Welding is one of DFAB's core strengths, supported by qualified welders, controlled procedures, and strong quality practices. Our welding capability ensures structural integrity, leak-tight joints, and compliance with global standards.",
    weldingTypes: [
      {
        name: "TIG Welding (GTAW)",
        points: [
          "Ideal for stainless steel and high-precision applications",
          "Clean and high-quality weld finish",
          "Controlled heat input for thin materials",
          "Suitable for hygienic and critical applications",
        ],
      },
      {
        name: "MIG Welding (GMAW)",
        points: [
          "High productivity welding for fabrication assemblies",
          "Suitable for structural and heavy fabrication",
          "Strong and reliable weld joints",
        ],
      },
      {
        name: "Laser Welding",
        points: [
          "High precision welding with minimal heat distortion",
          "Ideal for thin sheet metal and precision assemblies",
          "Clean welds with minimal post processing",
        ],
      },
      {
        name: "Orbital Welding",
        points: [
          "Automated welding for pipes and tubular assemblies",
          "High consistency and repeatability",
          "Used in critical process systems",
        ],
      },
      {
        name: "Arc Welding",
        points: [
          "Heavy fabrication and structural welding",
          "Strong penetration for thicker materials",
          "Reliable for industrial equipment fabrication",
        ],
      },
    ],
    applications: [
      "Stainless steel fabrication",
      "Pressure equipment components",
      "Data center cooling systems",
      "Process industry equipment",
      "Structural fabrication assemblies",
    ],
  },
  {
    id: "cnc-machining",
    icon: <Cpu size={36} />,
    title: "CNC Machining",
    subtitle: "Precision Turning & Milling",
    desc: "DFAB provides precision CNC machining services to produce components with tight tolerances and high dimensional accuracy. Our machining capability supports both standalone components and integrated fabricated assemblies.",
    keyCapabilities: [
      "Precision turning and milling",
      "Machining of stainless steel and engineering materials",
      "Tight tolerance manufacturing",
      "Custom machined components",
      "Machining support for fabricated assemblies",
    ],
    applications: [
      "Precision mechanical components",
      "Industrial equipment parts",
      "Assembly interfaces and mounting components",
      "Custom machined solutions",
    ],
  },
  {
    id: "heavy-fabrication",
    icon: <Settings size={36} />,
    title: "Heavy Fabrication",
    subtitle: "Structural & Industrial Assemblies",
    desc: "We specialize in heavy fabrication of stainless steel and structural assemblies, supported by experienced engineers and skilled fabrication teams. Our facility is equipped to handle complex projects requiring structural strength and dimensional accuracy.",
    keyCapabilities: [
      "Large structural assemblies",
      "Thick material welding",
      "Fabrication of industrial equipment structures",
      "Structural frames and heavy-duty components",
      "Fabrication with lifting and handling infrastructure",
    ],
    applications: [
      "Industrial machinery frames",
      "Process equipment structures",
      "Energy and infrastructure components",
      "Custom engineered fabrication solutions",
    ],
  },
  {
    id: "assembly-testing",
    icon: <FlaskConical size={36} />,
    title: "High Precision Assembly & Testing",
    subtitle: "Complete Assembly & Functional Verification",
    desc: "DFAB provides complete assembly and functional testing to ensure that manufactured systems meet customer requirements and perform reliably in real-world applications.",
    keyCapabilities: [
      "Mechanical assembly of complex systems",
      "Leak testing and pressure testing",
      "Dimensional verification",
      "Functional testing",
      "Quality inspection and documentation",
    ],
    applications: [
      "Data center cooling assemblies",
      "Industrial equipment systems",
      "Process equipment modules",
      "Precision engineered assemblies",
    ],
  },
];

function CapabilityCard({ cap, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white border border-slate-200 rounded-md overflow-hidden hover:border-[#0A66C2] hover:shadow-md transition-all duration-300 reveal"
      data-testid={`capability-card-${cap.id}`}
    >
      <div className="p-7">
        <div className="flex items-start gap-5 mb-5">
          <div className="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center text-[#0A66C2] shrink-0">
            {cap.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Chivo']">{cap.title}</h3>
            <p className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wide mt-1">{cap.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">{cap.desc}</p>

        {/* Welding types accordion */}
        {cap.weldingTypes && (
          <div className="mb-5 space-y-2">
            {cap.weldingTypes.map((wt) => (
              <div key={wt.name} className="border border-slate-100 rounded-md overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5">
                  <span className="text-sm font-semibold text-slate-800">{wt.name}</span>
                </div>
                <ul className="px-4 py-2 space-y-1">
                  {wt.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle size={12} className="text-[#0A66C2] shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Key Capabilities */}
        {cap.keyCapabilities && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Key Capabilities</p>
            <ul className="space-y-1.5">
              {cap.keyCapabilities.map((k) => (
                <li key={k} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-[#0A66C2] shrink-0 mt-0.5" />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Applications</p>
          <div className="flex flex-wrap gap-2">
            {cap.applications.map((a) => (
              <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{a}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const [showInquire, setShowInquire] = useState(false);
  const headerRef = useReveal();
  const capRef = useReveal();

  return (
    <main className="bg-white">
      {/* Page Header */}
      <div className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo'] animate-fade-up">
            Manufacturing Capabilities
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl animate-fade-up delay-100">
            Precision-driven manufacturing capabilities built for global standards — from fiber laser cutting to high-precision assembly and testing.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400 animate-fade-in delay-200">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Capabilities</span>
          </div>
        </div>
      </div>

      {/* Capabilities Summary Bar */}
      <div className="bg-[#0A66C2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center md:justify-start">
            {CAPABILITIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities Detail */}
      <section className="py-16 md:py-24" ref={capRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Detailed Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
              End-to-End Manufacturing Solutions
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Each capability is backed by qualified engineers, calibrated equipment, and strict quality procedures to meet global industrial standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {CAPABILITIES.map((cap, i) => (
              <div key={cap.id} id={cap.id}>
                <CapabilityCard cap={cap} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 font-['Chivo']">
            Need a Custom Manufacturing Solution?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Tell us your requirements — material, tolerance, quantity, and application — and our team will engineer the right solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowInquire(true)}
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-7 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors pulse-glow"
              data-testid="capabilities-inquire-btn"
            >
              Inquire Now <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#0A66C2] text-[#0A66C2] px-7 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors"
              data-testid="capabilities-contact-btn"
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
