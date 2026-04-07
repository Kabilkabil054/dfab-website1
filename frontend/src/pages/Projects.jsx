import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import project4 from "../assets/images/project4.jpg";
import project5 from "../assets/images/project5.jpg";
import project6 from "../assets/images/project6.jpg";

export const PROJECTS = [
  {
    img: project1,
    title: "Energy Sector",
    tag: "Pipeline & Welding",
    desc: "We have executed a high-pressure welded pipeline for a steam turbine with 100% radiographic joints welded at the 6G position — meeting the most critical energy sector standards.",
  },
  {
    img: project2,
    title: "Pharmaceuticals",
    tag: "Pressure Vessels",
    desc: "We have developed welded stainless steel drug processing equipment and containers qualifying the strict requirements of medical standards for pharmaceutical manufacturing.",
  },
  {
    img: project3,
    title: "Locomotive",
    tag: "Structural Fabrication",
    desc: "We have fabricated train seating and coaches, meeting the stringent locomotive safety standards. Precision fabrication for passenger comfort and safety.",
  },
  {
    img: project4,
    title: "Aeronautical",
    tag: "Precision Machining",
    desc: "We have developed machined aluminum components for aerospace-grade standards, requiring extremely tight tolerances and advanced machining capabilities.",
  },
  {
    img: project5,
    title: "Food & Dairy Industries",
    tag: "Food-Grade Fabrication",
    desc: "We have manufactured welded food-grade stainless steel processing equipment and storage containers qualifying food safety standards.",
  },
  {
    img: project6,
    title: "Automotive Industries",
    tag: "Jig & Fixture",
    desc: "We have developed a precision fixture for an automotive seating assembly line component welding to enable mass production, improved productivity and consistent quality.",
  },
];

export default function Projects() {
  return (
    <main className="bg-white">

      {/* ✅ UPDATED HEADER */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            Portfolio
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Our Projects
          </h1>

          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Projects</span>
          </div>
        </div>
      </div>

      {/* PROJECT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
              Industries We Serve
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
              Delivering Precision Across Sectors
            </h2>

            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              From critical energy infrastructure to food safety equipment, DFAB has consistently delivered world-class fabrication solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0A66C2] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {p.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Chivo']">
                    {p.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#0A66C2] rounded-xl p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3 font-['Chivo']">
              Have a Project in Mind?
            </h2>

            <p className="text-blue-100 mb-6">
              Let us help you achieve your fabrication goals with precision and quality.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A66C2] px-7 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Discuss Your Project <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}