import { Link } from "react-router-dom";
import { CheckCircle, Award, Linkedin, Mail } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const LEADERS = [
  {
    name: "Rajesh Venkataraman",
    role: "Founder & Managing Director",
    img: "https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?crop=entropy&cs=srgb&fm=jpg&q=85",
    bio: "With over 20 years in the fabrication and engineering industry, Rajesh founded DFAB with a vision to deliver world-class stainless steel fabrication solutions to industrial clients across India.",
    expertise: ["Strategic Leadership", "Business Development", "Client Relations"],
  },
  {
    name: "Sunil Kumar",
    role: "Technical Director & Chief Engineer",
    img: "https://images.unsplash.com/flagged/photo-1567347611511-a8db7dce144f?crop=entropy&cs=srgb&fm=jpg&q=85",
    bio: "Sunil brings 18 years of hands-on expertise in precision welding and fabrication. He oversees all technical operations, ensuring every project meets the highest quality standards and engineering specifications.",
    expertise: ["Welding Engineering", "6G Qualification", "Process Optimization"],
  },
  {
    name: "Priya Nair",
    role: "Quality Assurance Manager",
    img: "https://images.pexels.com/photos/34690642/pexels-photo-34690642.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    bio: "Priya leads DFAB's ISO 9001:2015 quality management system. With a background in metallurgy and quality engineering, she ensures every component delivered meets customer requirements and industry standards.",
    expertise: ["ISO 9001:2015", "NDT & Inspection", "Quality Systems"],
  },
];

export default function About() {
  const storyRef = useReveal();
  const vmqRef = useReveal();
  const facilRef = useReveal();
  const leaderRef = useReveal();

  return (
    <main className="bg-white">
      {/* Page Header */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            About DFAB
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Who We Are
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed"> 
            We combine decades of engineering expertise with advanced manufacturing 
            technology to deliver high-integrity solutions for global sectors.
          </p>

          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-16 md:py-24" ref={storyRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch mb-20">
            <div className="reveal-left flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                  Our Story
                </span>

                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-5 font-['Chivo']">
                  Precision Fabrication Since 2018
                </h2>

                <p className="text-slate-600 leading-relaxed mb-5">
                  DFAB Stainless System Pvt Ltd was established on{" "}
                  <strong>28 September 2018</strong>. We are an{" "}
                  <strong>ISO 9001:2015 certified</strong> fabrication company,
                  positioned in the prime Peenya Industrial Area, Bengaluru.
                </p>

                <p className="text-slate-600 leading-relaxed mb-5">
                  We offer end-to-end solutions in the field of equipment
                  fabrication and machining. With a 7000 sq-ft operating built-up
                  area, we are equipped with a highly skilled team with domain
                  experience to craft services for your products.
                </p>

                <p className="text-slate-600 leading-relaxed mb-8">
                  We have significant in-house talent to provide services like
                  pressure vessel fabrication, high-pressure pipeline welding,
                  heavy engineering and component machining.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#0A66C2] text-center leading-tight">
                      ISO
                      <br />
                      9001:2015
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      ISO 9001:2015 Certified
                    </div>
                    <div className="text-sm text-slate-500">
                      Quality Management System
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-green-700 text-center leading-tight">
                      ZED
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      ZED Certified
                    </div>
                    <div className="text-sm text-slate-500">
                      Zero Defect Zero Effect — Govt. of India
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-yellow-50 border border-yellow-200 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-yellow-700 text-center leading-tight">
                      ADNOC
                      <br />
                      Approved
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      ADNOC Approved Vendor
                    </div>
                    <div className="text-sm text-slate-500">
                      Qualified for International Projects
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right h-full flex">
              <div className="w-full h-full overflow-hidden rounded-md shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1730584475652-d55a2021bae8?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="DFAB Factory"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Vision, Mission, Quality Policy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" ref={vmqRef}>
            {[
              {
                title: "Vision",
                icon: <Award size={28} />,
                text: "To be the one-stop solution provider for all fabrication needs across domains by 2030.",
              },
              {
                title: "Mission",
                icon: <CheckCircle size={28} />,
                text: "To be the partner for fabricating thoughts of our customers in supporting the development of world-class products and processes with assured quality, time & cost.",
              },
              {
                title: "Quality Policy",
                icon: <Award size={28} />,
                text: "We are committed to manufacturing and supplying consistently high-quality machined components and fabricated items on time, meeting customer expectations and ensuring continuous improvement.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal bg-slate-50 border border-slate-200 rounded-md p-8 hover:border-[#0A66C2] transition-colors delay-${(i + 1) * 100}`}
                data-testid={`about-${item.title.toLowerCase()}-card`}
              >
                <div className="w-14 h-14 bg-blue-50 rounded-md flex items-center justify-center text-[#0A66C2] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-['Chivo']">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className="mb-20" ref={facilRef}>
            <div className="text-center mb-10 reveal">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                Infrastructure
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 font-['Chivo']">
                Our Facilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {[
                {
                  title: "7000 sqft Operating Space",
                  desc: "Large, well-organized workspace for heavy fabrication work.",
                },
                {
                  title: "5 Ton EOT Crane",
                  desc: "Heavy lifting capability for large fabrication assemblies.",
                },
                {
                  title: "10+ Welding Machines",
                  desc: "TIG, MIG welding machines for all types of welding requirements.",
                },
                {
                  title: "Advanced Laser Technology",
                  desc: "State-of-the-art laser cutting and welding equipment.",
                },
                {
                  title: "CNC & Manual Machines",
                  desc: "Conventional milling, turning, and radial drilling machines.",
                },
                {
                  title: "Quality Inspection",
                  desc: "Dedicated quality inspectors ensuring every product meets standards.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="reveal flex gap-4 p-5 border border-slate-200 rounded-md bg-white hover:border-[#0A66C2] transition-colors"
                >
                  <CheckCircle size={20} className="text-[#0A66C2] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div ref={leaderRef}>
            <div className="text-center mb-12 reveal">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                Meet the Team
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">
                Our Leadership Team
              </h2>
              <p className="text-slate-600 mt-3 max-w-xl mx-auto">
                Driven by experience, passion and a commitment to excellence in
                industrial fabrication.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 stagger-children"
              data-testid="leadership-team"
            >
              {LEADERS.map((leader) => (
                <div
                  key={leader.name}
                  className="reveal group bg-white border border-slate-200 rounded-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  data-testid={`leader-${leader.name.split(" ")[0].toLowerCase()}`}
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0A66C2] cursor-pointer hover:bg-[#0A66C2] hover:text-white transition-colors">
                        <Linkedin size={14} />
                      </span>
                      <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0A66C2] cursor-pointer hover:bg-[#0A66C2] hover:text-white transition-colors">
                        <Mail size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 font-['Chivo']">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#0A66C2] mb-3">
                      {leader.role}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {leader.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-50 text-[#0A66C2] px-2.5 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-[#0A66C2] rounded-md p-10 text-center reveal">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Chivo']">
                Ready to Work With Our Team?
              </h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                Contact our experienced team today and let us help you with your
                next fabrication project.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0A66C2] px-7 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors"
                data-testid="about-contact-btn"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}