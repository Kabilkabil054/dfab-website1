import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1765218933298-dc55fdfb517a?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Energy Sector",
    tag: "Pipeline & Welding",
    desc: "We have executed a high-pressure welded pipeline for a steam turbine with 100% radiographic joints welded at the 6G position — meeting the most critical energy sector standards.",
  },
  {
    img: "https://images.unsplash.com/photo-1513828170880-00eeeac21306?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Pharmaceuticals",
    tag: "Pressure Vessels",
    desc: "We have developed welded stainless steel drug processing equipment and containers qualifying the strict requirements of medical standards for pharmaceutical manufacturing.",
  },
  {
    img: "https://images.unsplash.com/photo-1738162837389-3b02d6dd507b?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Locomotive",
    tag: "Structural Fabrication",
    desc: "We have fabricated train seating and coaches, meeting the stringent locomotive safety standards. Precision fabrication for passenger comfort and safety.",
  },
  {
    img: "https://images.unsplash.com/photo-1763684041948-f254c06b1a05?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Aeronautical",
    tag: "Precision Machining",
    desc: "We have developed machined aluminum components for aerospace-grade standards, requiring extremely tight tolerances and advanced machining capabilities.",
  },
  {
    img: "https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    title: "Food & Dairy Industries",
    tag: "Food-Grade Fabrication",
    desc: "We have manufactured welded food-grade stainless steel food processing equipment and storage containers qualifying food safety standards.",
  },
  {
    img: "https://images.unsplash.com/photo-1748002757537-00ab5114135b?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Automotive Industries",
    tag: "Jig & Fixture",
    desc: "We have developed a precision fixture for an automotive seating assembly line component welding to enable mass production, improved productivity and consistent quality.",
  },
];

export default function Projects() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">Our Projects</h1>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Projects</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
              Delivering Precision Across Sectors
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              From critical energy infrastructure to food safety equipment, DFAB has consistently delivered world-class fabrication solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p) => (
              <div key={p.title} className="group bg-white border border-slate-200 rounded-md overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300" data-testid={`project-${p.title.replace(/\s+/g, "-").toLowerCase()}`}>
                <div className="relative overflow-hidden h-52">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0A66C2] text-white text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Chivo']">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#0A66C2] rounded-md p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3 font-['Chivo']">Have a Project in Mind?</h2>
            <p className="text-blue-100 mb-6">Let us help you achieve your fabrication goals with precision and quality.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0A66C2] px-7 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors" data-testid="projects-contact-btn">
              Discuss Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
