import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";


const MACHINES = [
  { name: "TIG Welding Machines", count: "6+", desc: "For precision stainless steel welding" },
  { name: "MIG Welding Machines", count: "4+", desc: "For production welding applications" },
  { name: "Conventional Lathe", count: "2", desc: "For turning and machining operations" },
  { name: "Milling Machine", count: "1", desc: "For surface and contour machining" },
  { name: "Radial Drilling Machine", count: "1", desc: "For precision hole-making operations" },
  { name: "Laser Cutting System", count: "1", desc: "Advanced laser technology for precision cuts" },
  { name: "5 Ton EOT Crane", count: "1", desc: "For heavy lifting and assembly" },
  { name: "Grinding Machines", count: "2", desc: "For surface finishing operations" },
];

const CAPABILITIES = [
  "Pressure vessel fabrication up to high-pressure specifications",
  "Pipeline welding at 6G positions with 100% radiographic testing",
  "Heavy engineering fabrication up to 5 tons per assembly",
  "Stainless steel, carbon steel and aluminium fabrication",
  "Stellite and hardfacing welding for wear-resistant surfaces",
  "CNC and conventional precision machining",
  "Custom die refurbishment and life extension",
  "On-site and off-site installation services",
];

export default function Infrastructure() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Our Facility</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']animate-fade-up">Infrastructure</h1>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Infrastructure</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Our Workshop</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-5 font-['Chivo']">
                State-of-the-Art 7000 sqft Facility
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Located in the prime Peenya Industrial Area, Bengaluru, our modern workshop is equipped with advanced machinery and operated by a highly skilled engineering team.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our facility is designed to handle end-to-end fabrication projects — from raw material processing to final quality inspection and delivery.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "7000 sqft", label: "Workshop Area" },
                  { value: "5 Tons", label: "Crane Capacity" },
                  { value: "10+", label: "Welding Machines" },
                  { value: "ISO", label: "9001:2015 Certified" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-blue-50 rounded-md p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-[#0A66C2] font-['Chivo']">{stat.value}</div>
                    <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Factory Overview"
                className="rounded-md h-52 w-full object-cover"
                data-testid="infra-img-1"
              />
              <img
                src="https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Machinery"
                className="rounded-md h-52 w-full object-cover"
                data-testid="infra-img-2"
              />
              <img
                src="https://images.pexels.com/photos/22717514/pexels-photo-22717514.jpeg?auto=compress&cs=tinysrgb&dpr=2"
                alt="Welding"
                className="rounded-md h-52 w-full object-cover"
                data-testid="infra-img-3"
              />
              <img
                src="https://images.pexels.com/photos/32200451/pexels-photo-32200451.jpeg?auto=compress&cs=tinysrgb&dpr=2"
                alt="Steel Fabrication"
                className="rounded-md h-52 w-full object-cover"
                data-testid="infra-img-4"
              />
            </div>
          </div>

          {/* Machines */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Equipment</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 font-['Chivo']">Machines & Equipment</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MACHINES.map((m) => (
                <div
                  key={m.name}
                  className="bg-slate-50 border border-slate-200 rounded-md p-6 text-center hover:border-[#0A66C2] transition-colors"
                  data-testid={`machine-${m.name.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="text-3xl font-bold text-[#0A66C2] font-['Chivo'] mb-2">{m.count}</div>
                  <h4 className="font-semibold text-slate-900 mb-2">{m.name}</h4>
                  <p className="text-xs text-slate-500">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">What We Can Do</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 font-['Chivo']">Our Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-start gap-3 p-4 border border-slate-200 rounded-md bg-white">
                  <CheckCircle size={18} className="text-[#0A66C2] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In-house Talent */}
          <div className="bg-[#0F172A] rounded-md p-10">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Our Team</span>
              <h2 className="text-3xl font-bold text-white mt-2 font-['Chivo']">In-House Talent</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Skilled Welders", desc: "Qualified for 6G positions — the highest welding qualification for pipe welding." },
                { title: "Project Engineers", desc: "Experienced engineers to facilitate product development from design to delivery." },
                { title: "Quality Inspectors", desc: "Dedicated QA team ensuring every product meets customer and industry standards." },
              ].map((t) => (
                <div key={t.title} className="bg-slate-800 rounded-md p-6 border border-slate-700">
                  <h4 className="text-white font-semibold text-lg mb-3 font-['Chivo']">{t.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}