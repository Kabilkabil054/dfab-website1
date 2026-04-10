import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";
import { SERVICES as ALL_SERVICES } from "./Services";
import { getProjects, initializeProjects } from "../data/projectsData";

export default function Projects() {
  const location = useLocation();
  const [projects, setProjects] = useState([]);

  const isProjectsOnly = location.hash === "#projects";
  const isServicesOnly = location.hash === "#services";
  const isFullPage = !location.hash;

  useEffect(() => {
    initializeProjects();
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setProjects(getProjects());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (location.hash === "#projects") {
      const el = document.getElementById("projects-section");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }, 0);
      }
    } else if (location.hash === "#services") {
      const el = document.getElementById("services");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }, 0);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <main className="bg-white relative">
      
      {/* ✅ LIGHTER VISIBLE CORNER ADMIN BUTTON */}
      <div className="absolute top-4 right-4 z-50 opacity-50 hover:opacity-100 transition-all duration-300">
        <Link
          to="/admin/projects"
          className="flex items-center gap-1.5 px-3 py-2 bg-white/20 text-white/70 hover:text-white hover:bg-[#0A66C2] rounded-lg border border-white/20 hover:border-[#0A66C2] transition-all shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm"
          title="Admin Console"
        >
          <Settings size={14} className="animate-pulse-slow" />
          <span className="text-[10px] font-black uppercase tracking-widest">Admin</span>
        </Link>
      </div>

      {(isFullPage || isProjectsOnly) && (
        <>
          {/* HEADER SECTION */}
          <section className="bg-[#0F172A] h-[260px] flex items-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
                Our Projects
              </h1>
              <p className="text-slate-400 mt-3 max-w-2xl">
                Explore our portfolio of precision fabrication and engineering solutions delivered across diverse global industry sectors.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Projects</span>
              </div>
            </div>
          </section>

          {/* PROJECTS GRID */}
          <section id="projects-section" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-14">
                <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                  Industries We Serve
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
                  Delivering Precision Across Sectors
                </h2>
                <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
                  From critical energy infrastructure to food safety equipment,
                  DFAB has consistently delivered world-class fabrication solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
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

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Chivo']">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed flex-1">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <div className="w-full bg-[#0A66C2] rounded-xl p-10 text-center shadow-lg">
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
            </div>
          </section>
        </>
      )}

      {(isFullPage || isServicesOnly) && (
        <>
          {/* SERVICES HEADER */}
          <section id="services" className="bg-[#0F172A] h-[260px] flex items-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
                Services
              </h2>
              <p className="text-slate-400 mt-3 max-w-2xl">
                Explore the professional fabrication, machining, and engineering services that support our high-precision project execution.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Services</span>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-[0.18em]">
                  Our Services
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 font-['Chivo'] tracking-tight">
                  Services Behind Our Projects
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-7">
                  Explore the fabrication, machining, and engineering services
                  that support our execution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_SERVICES.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#0A66C2]/30 transition-all duration-500"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 font-['Chivo']">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-6 line-clamp-3">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-['Chivo']">
                  Need the Right Service for Your Requirement?
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                  Our team supports fabrication, machining, welding, and
                  engineering requirements across multiple industries with
                  precision and consistency.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-7 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
                >
                  Discuss Your Requirement
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}