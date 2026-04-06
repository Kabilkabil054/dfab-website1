import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronRight, ChevronLeft, Award, Clock, Users, Wrench,
  Layers, Flame, GitMerge, Cog, Box, Settings, Cpu, Star,
  CheckCircle, ArrowRight, Instagram, Globe
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import InquireModal from "../components/InquireModal";

// ===================== LOCAL IMAGE IMPORTS =====================

// Hero
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

// Projects
import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import project4 from "../assets/images/project4.jpg";
import project5 from "../assets/images/project5.jpg";
import project6 from "../assets/images/project6.jpg";

// About / Factory / Infra
import aboutFactory from "../assets/images/about-factory.jpg";
import factory1 from "../assets/images/factory1.jpg";
import factory2 from "../assets/images/factory2.jpg";
import factory3 from "../assets/images/factory3.jpg";
import factory4 from "../assets/images/factory4.jpg";
import infra1 from "../assets/images/infra1.jpg";
import infra2 from "../assets/images/infra2.jpg";
import infra3 from "../assets/images/infra3.jpg";

// Video thumbnails
import video1 from "../assets/images/video1.jpg";
import video2 from "../assets/images/video2.jpg";
import video3 from "../assets/images/video3.jpg";

const HERO_SLIDES = [
  {
    img: hero1,
    tag: "ISO 9001:2015 · ZED Certified",
    heading: "Precision Welding & Machining Solution Partner",
    text: "End-to-end stainless steel fabrication with world-class quality standards. Serving energy, pharma, automotive and aerospace sectors.",
    cta1: { label: "Inquire Now", action: "modal" },
    cta2: { label: "Our Capabilities", to: "/capabilities" },
  },
  {
    img: hero2,
    tag: "ISO 9001:2015 · ADNOC Approved Vendor",
    heading: "Driving Quality Culture in Meeting the Global Standards",
    text: "Skilled welders qualified for 6G positions handling TIG, MIG, Laser and Orbital welding for the world's most demanding applications.",
    cta1: { label: "Inquire Now", action: "modal" },
    cta2: { label: "Quality & Certifications", to: "/quality" },
  },
  {
    img: hero3,
    tag: "Open for Global Projects",
    heading: "Winning with Customers in the Journey of Excellence",
    text: "From pressure vessels to precision assemblies — we manufacture to your exact specifications with guaranteed quality and on-time delivery.",
    cta1: { label: "Inquire Now", action: "modal" },
    cta2: { label: "View Projects", to: "/projects" },
  },
];

const SERVICES = [
  { icon: <Layers size={28} />, title: "Sheetmetal Fabrication", desc: "SS, Aluminum & CS with TIG, MIG and Arc welding for complex components." },
  { icon: <Box size={28} />, title: "Pressure Vessels", desc: "Custom pressure vessels for pharma and dairy applications of all sizes." },
  { icon: <GitMerge size={28} />, title: "Pipeline Fabrication", desc: "High-pressure pipeline fabrication for oil & gas, pharma and dairy." },
  { icon: <Flame size={28} />, title: "Stellite Welding", desc: "Expert stellite welding for erosion and corrosion resistance." },
  { icon: <Cog size={28} />, title: "Die Welding", desc: "Refurbishing die life by depositing parent material in worn regions." },
  { icon: <Star size={28} />, title: "Custom Fabrication", desc: "Architectural decor products and structures with premium finish." },
  { icon: <Wrench size={28} />, title: "Jig & Fixture", desc: "Precision jigs and fixtures enabling consistent quality production." },
  { icon: <Cpu size={28} />, title: "Precision Machining", desc: "High-precision machined components for fabrication system needs." },
  { icon: <Settings size={28} />, title: "New Product Development", desc: "Comprehensive NPD services to turn your vision into reality." },
];

const PROJECTS = [
  {
    img: project1,
    title: "Energy Sector",
    desc: "High-pressure welded pipeline for steam turbine with 100% radiographic joints at 6G position.",
  },
  {
    img: project2,
    title: "Pharmaceuticals",
    desc: "Welded SS drug processing equipment qualifying strict medical standards.",
  },
  {
    img: project3,
    title: "Locomotive",
    desc: "Train seating and coach fabrication meeting locomotive safety standards.",
  },
  {
    img: project4,
    title: "Aeronautical",
    desc: "Machined aluminium components for aerospace-grade standards.",
  },
  {
    img: project5,
    title: "Food & Dairy",
    desc: "Food-grade SS processing equipment meeting food safety standards.",
  },
  {
    img: project6,
    title: "Automotive",
    desc: "Fixture for automotive seating assembly line enabling mass production.",
  },
];

const WHYCHOOSE = [
  { icon: <Award size={32} />, title: "Quality First", desc: "ISO 9001:2015 certified processes ensuring consistent high-quality output every time." },
  { icon: <Users size={32} />, title: "Skilled Workforce", desc: "Welders qualified for 6G positions with experienced project engineers on every job." },
  { icon: <Clock size={32} />, title: "Timely Delivery", desc: "We communicate status to stakeholders and meet every delivery timeline, guaranteed." },
  { icon: <CheckCircle size={32} />, title: "Deep Experience", desc: "Serving energy, pharma, aerospace, automotive & food industries since 2018." },
];

const PROCESS = [
  { num: "01", title: "Technical Planning & Design", desc: "We lay out the plan and conceptualize the required design for your product." },
  { num: "02", title: "Sourcing & Procurement", desc: "Strong committed vendor base for project-specific procurement and sourcing." },
  { num: "03", title: "Fabricate, QA & Testing", desc: "Highly skilled engineering workmanship deployed with assured quality control." },
  { num: "04", title: "Delivery / Installation", desc: "We communicate status and ensure delivery timelines are met and deployed." },
];

const STATS = [
  { value: "100%", label: "Quality Adherence" },
  { value: "200+", label: "Successful Projects" },
  { value: "50+", label: "Customers" },
  { value: "6+", label: "Industry Sectors" },
];

const INDUSTRIES = [
  { label: "Aerospace", icon: "✈" },
  { label: "Defence", icon: "🛡" },
  { label: "Medical", icon: "⚕" },
  { label: "Pharma", icon: "🔬" },
  { label: "Semiconductor", icon: "💡" },
  { label: "Dairy & Food Processing", icon: "🏭" },
  { label: "Energy & Turbines", icon: "⚡" },
  { label: "Automotive", icon: "🚗" },
  { label: "Heavy Engineering", icon: "⚙" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Procurement Manager",
    company: "Pharma Corp India",
    sector: "Pharmaceuticals",
    rating: 5,
    text: "DFAB delivered our pressure vessels exactly to spec, on time and within budget. Their welding quality passed all our strict pharmaceutical standards without a single rework. Highly recommend for any critical fabrication work.",
  },
  {
    name: "Suresh Nair",
    role: "Project Director",
    company: "Power Gen Systems",
    sector: "Energy",
    rating: 5,
    text: "We hired DFAB for a high-pressure steam pipeline project requiring 100% radiographic testing. Their 6G welders delivered impeccable results. Zero defects, zero delays. This is the team you want for critical energy infrastructure.",
  },
  {
    name: "Anand Krishnamurthy",
    role: "VP Operations",
    company: "DairyCo Foods",
    sector: "Food & Dairy",
    rating: 5,
    text: "DFAB fabricated our stainless steel food processing tanks to FSSAI standards. The finish quality and hygiene compliance were top-notch. Their team was professional and responsive throughout the project.",
  },
  {
    name: "Priya Mehta",
    role: "Engineering Head",
    company: "AutoTech Manufacturing",
    sector: "Automotive",
    rating: 5,
    text: "The jig and fixture system DFAB built for our assembly line improved our production efficiency by 30%. Excellent precision, great team coordination, and they genuinely understood our manufacturing requirements.",
  },
  {
    name: "Vikram Sharma",
    role: "Technical Manager",
    company: "AeroSpace Components Ltd",
    sector: "Aeronautical",
    rating: 5,
    text: "DFAB's precision machining capabilities met our aerospace-grade tolerance requirements. The quality inspection process they follow is thorough and their documentation was complete and professional.",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function HeroCarousel({ onInquire }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
    const timer = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative h-[560px] md:h-[680px]" data-testid="hero-carousel">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className="embla__slide h-full relative" data-testid={`hero-slide-${i + 1}`}>
              <img src={slide.img} alt={slide.heading} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                  <div className="max-w-2xl">
                    <span className="inline-block bg-[#0A66C2] text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm mb-5 animate-fade-in">
                      {slide.tag}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 font-['Chivo'] animate-fade-up delay-100">
                      {slide.heading}
                    </h1>
                    <p className="text-base md:text-lg text-white/85 mb-8 leading-relaxed animate-fade-up delay-200">
                      {slide.text}
                    </p>
                    <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                      {slide.cta1.action === "modal" ? (
                        <button
                          onClick={onInquire}
                          className="bg-[#0A66C2] text-white px-7 py-3 font-semibold rounded-sm hover:bg-[#084e96] transition-colors pulse-glow"
                          data-testid={`hero-cta-primary-${i}`}
                        >
                          {slide.cta1.label}
                        </button>
                      ) : (
                        <Link to={slide.cta1.to} className="bg-[#0A66C2] text-white px-7 py-3 font-semibold rounded-sm hover:bg-[#084e96] transition-colors pulse-glow" data-testid={`hero-cta-primary-${i}`}>
                          {slide.cta1.label}
                        </Link>
                      )}
                      <Link to={slide.cta2.to} className="border border-white text-white px-7 py-3 font-semibold rounded-sm hover:bg-white hover:text-slate-900 transition-colors" data-testid={`hero-cta-secondary-${i}`}>
                        {slide.cta2.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors" data-testid="hero-prev">
        <ChevronLeft size={20} />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors" data-testid="hero-next">
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-[#0A66C2]" : "w-2 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
    const timer = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-[#0A66C2] overflow-hidden" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Client Feedback</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 font-['Chivo']">What Our Clients Say</h2>
        </div>

        <div className="embla" ref={emblaRef} data-testid="testimonials-carousel">
          <div className="embla__container">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="embla__slide"
                style={{ flex: "0 0 100%", minWidth: 0, paddingLeft: "1rem", paddingRight: "1rem" }}
                data-testid={`testimonial-slide-${i}`}
              >
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-[140px] font-black text-blue-50 leading-none select-none font-['Chivo']">"</div>

                    <div className="relative z-10">
                      <StarRating count={t.rating} />
                      <p className="text-slate-700 text-lg leading-relaxed mt-5 mb-7 italic font-medium">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A66C2] to-blue-400 flex items-center justify-center text-white font-bold text-xl font-['Chivo'] shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 font-['Chivo']">{t.name}</div>
                          <div className="text-sm text-slate-500">{t.role} · {t.company}</div>
                        </div>
                        <span className="text-xs bg-blue-50 text-[#0A66C2] font-semibold px-3 py-1.5 rounded-full">{t.sector}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
            data-testid="testimonial-prev"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                data-testid={`testimonial-dot-${i}`}
              />
            ))}
          </div>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
            data-testid="testimonial-next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [showInquire, setShowInquire] = useState(false);
  const aboutRef = useReveal();
  const servicesRef = useReveal();
  const whyRef = useReveal();
  const processRef = useReveal();
  const projectsRef = useReveal();
  const industriesRef = useReveal();
  const infraRef = useReveal();
  const instaRef = useReveal();
  const ctaRef = useReveal();

  return (
    <main>
      <HeroCarousel onInquire={() => setShowInquire(true)} />

      <div className="bg-[#0A66C2]" data-testid="stats-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={s.label} className={`text-center text-white reveal delay-${(i + 1) * 100}`}>
              <div className="text-3xl font-bold font-['Chivo']">{s.value}</div>
              <div className="text-sm text-blue-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white" data-testid="about-preview" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">About DFAB</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-5 font-['Chivo']">
                Fabricating Your Vision with Precision
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                DFAB Stainless System Pvt Ltd is an <strong>ISO 9001:2015 certified</strong> fabrication company established in 2018, located in the prime Peenya Industrial Area, Bengaluru.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                With a 7000 sq-ft facility, a 5-ton crane, 10+ welding machines (TIG, MIG), and a highly skilled team, we provide end-to-end solutions in equipment fabrication, high-pressure pipeline welding, and precision machining.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["7000 sqft Operating Space", "5 Ton Crane Facility", "10+ Welding Machines", "Skilled 6G Welders"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#0A66C2] shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors" data-testid="about-learn-more">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative reveal-right">
              <img src={aboutFactory} alt="DFAB Factory" className="rounded-md w-full h-96 object-cover shadow-lg" />
              <div className="absolute -bottom-5 -left-5 bg-[#0A66C2] text-white p-5 rounded-md shadow-lg hidden md:block">
                <div className="text-3xl font-bold font-['Chivo']">6+</div>
                <div className="text-sm text-blue-100">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50" data-testid="services-section" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">Our Services</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Comprehensive fabrication services tailored for industrial clients across multiple sectors.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {SERVICES.map((s) => (
              <div key={s.title} className="reveal bg-white border border-slate-200 rounded-md p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300" data-testid={`service-card-${s.title.replace(/\s/g, "-").toLowerCase()}`}>
                <div className="w-14 h-14 bg-blue-50 rounded-md flex items-center justify-center text-[#0A66C2] mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-['Chivo']">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link to="/services" className="inline-flex items-center gap-2 border border-[#0A66C2] text-[#0A66C2] px-6 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors" data-testid="services-view-all">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="why-choose-section" ref={whyRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Why DFAB</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {WHYCHOOSE.map((item) => (
              <div key={item.title} className="reveal text-center" data-testid={`why-card-${item.title.replace(/\s/g, "-").toLowerCase()}`}>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#0A66C2] mx-auto mb-4 transition-transform hover:scale-110 duration-200">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-['Chivo']">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0F172A]" data-testid="process-section" ref={processRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">How We Work</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 font-['Chivo']">Our Work Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {PROCESS.map((step, i) => (
              <div key={step.num} className="relative reveal" data-testid={`process-step-${step.num}`}>
                <div className="bg-slate-800 rounded-md p-6 h-full border border-slate-700 hover:border-[#0A66C2] transition-colors duration-300">
                  <div className="text-5xl font-black text-[#0A66C2]/30 font-['Chivo'] mb-3">{step.num}</div>
                  <h3 className="text-base font-semibold text-white mb-2 font-['Chivo']">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 -right-3 z-10 w-6 h-6 bg-[#0A66C2] rounded-full items-center justify-center">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="projects-preview" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Our Portfolio</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">Featured Projects</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Delivering precision fabrication across diverse industrial sectors.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {PROJECTS.map((p) => (
              <div key={p.title} className="reveal group relative overflow-hidden rounded-md cursor-pointer shadow-sm hover:shadow-md transition-shadow" data-testid={`project-card-${p.title.replace(/\s/g, "-").toLowerCase()}`}>
                <img src={p.img} alt={p.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-semibold text-lg font-['Chivo'] mb-1">{p.title}</h3>
                  <p className="text-white/75 text-xs leading-relaxed line-clamp-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link to="/projects" className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors" data-testid="projects-view-all">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50" data-testid="industries-section" ref={industriesRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Sectors</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">Industries We Serve</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Delivering precision fabrication across 9 demanding industrial sectors worldwide.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-4 stagger-children mb-20">
            {INDUSTRIES.map((ind) => (
              <div key={ind.label} className="reveal flex flex-col items-center gap-2 py-5 px-3 bg-white rounded-md border border-slate-200 hover:border-[#0A66C2] hover:shadow-sm transition-all duration-300 text-center" data-testid={`industry-${ind.label.replace(/\s/g, "-").toLowerCase()}`}>
                <span className="text-2xl" role="img" aria-label={ind.label}>{ind.icon}</span>
                <span className="text-xs font-semibold text-slate-700 leading-tight">{ind.label}</span>
              </div>
            ))}
          </div>

          <div className="reveal">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Why Trust Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 font-['Chivo']">Built on Proof, Not Promises</h2>
              <p className="text-slate-600 mt-3 max-w-xl mx-auto">Real clients, real facilities, real processes — every detail you need to make a confident decision.</p>
            </div>

            <div className="mb-14" data-testid="client-logos">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">Trusted by Industry Leaders</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  "Pharma Corp India", "Power Gen Systems", "DairyCo Foods",
                  "AutoTech Mfg", "AeroSpace Ltd", "Defence Systems India",
                  "SemiCon Tech", "Energy Solutions"
                ].map((name) => (
                  <div key={name} className="h-12 px-6 bg-white border border-slate-200 rounded-md flex items-center justify-center hover:border-[#0A66C2] transition-colors">
                    <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div data-testid="factory-images">
                <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#0A66C2] inline-block" />
                  Factory Images
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src={factory1}
                    alt="DFAB Workshop — Grinding"
                    className="rounded-md h-44 w-full object-cover hover:opacity-90 transition-opacity"
                  />
                  <img
                    src={factory2}
                    alt="DFAB Factory — Welding"
                    className="rounded-md h-44 w-full object-cover hover:opacity-90 transition-opacity"
                  />
                  <img
                    src={factory3}
                    alt="DFAB — Laser Cutting"
                    className="rounded-md h-44 w-full object-cover hover:opacity-90 transition-opacity"
                  />
                  <img
                    src={factory4}
                    alt="DFAB — Fabrication Process"
                    className="rounded-md h-44 w-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>

              <div data-testid="process-videos">
                <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#0A66C2] inline-block" />
                  Process Videos
                </p>
                <div className="space-y-3">
                  {[
                    { title: "TIG Welding — Stainless Steel Precision", thumb: video1 },
                    { title: "Laser Cutting — Complex Profile Fabrication", thumb: video2 },
                    { title: "Heavy Fabrication — Structural Assembly", thumb: video3 },
                  ].map((vid) => (
                    <a
                      key={vid.title}
                      href="https://www.youtube.com/channel/UClfxW0cBkQMjoU3VdhVv-cg"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 bg-white border border-slate-200 rounded-md overflow-hidden hover:border-[#0A66C2] hover:shadow-sm transition-all duration-200 group"
                      data-testid={`process-video-${vid.title.substring(0, 10).replace(/\s/g, "-").toLowerCase()}`}
                    >
                      <div className="relative w-28 h-20 shrink-0">
                        <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="w-9 h-9 bg-[#0A66C2] rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 py-3 pr-4">
                        <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-[#0A66C2] transition-colors">{vid.title}</p>
                        <p className="text-xs text-slate-400 mt-1">Watch on YouTube</p>
                      </div>
                    </a>
                  ))}
                  <a
                    href="https://www.youtube.com/channel/UClfxW0cBkQMjoU3VdhVv-cg"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-[#0A66C2] hover:underline mt-1"
                  >
                    View all videos on YouTube <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-16 md:py-24 bg-slate-50" data-testid="infrastructure-preview" ref={infraRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 reveal-left">
              <img src={infra1} alt="Factory" className="rounded-md h-48 w-full object-cover" />
              <img src={infra2} alt="Machinery" className="rounded-md h-48 w-full object-cover" />
              <img src={infra3} alt="Welding" className="rounded-md h-48 w-full object-cover col-span-2" />
            </div>
            <div className="reveal-right">
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Our Facility</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-5 font-['Chivo']">World-Class Infrastructure</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Our 7000 sq-ft state-of-the-art facility in Peenya Industrial Area is equipped with advanced machinery and operated by a highly skilled engineering team.</p>
              <div className="space-y-3 mb-8">
                {["7000 sqft Operating Space with 5 Ton Crane", "10+ TIG & MIG Welding Machines", "Conventional Milling & Turning Machines", "Radial Drilling Machine", "Advanced Laser Technology", "Quality Inspection Equipment"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/infrastructure" className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors" data-testid="infra-explore-btn">
                Explore Infrastructure <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="instagram-section" ref={instaRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 reveal">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Instagram size={20} className="text-[#0A66C2]" />
              <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Follow Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 font-['Chivo']">Our Work in Action</h2>
            <p className="text-slate-600 mt-3">Follow @dfab_stainless on Instagram for the latest updates</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 stagger-children">
            {[...Array(6)].map((_, i) => (
              <a key={i} href="https://www.instagram.com" target="_blank" rel="noreferrer" className="reveal-scale aspect-square bg-slate-100 rounded-md overflow-hidden flex items-center justify-center group hover:opacity-90 transition-opacity relative" data-testid={`instagram-placeholder-${i + 1}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <Instagram size={32} className="text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-6">Instagram posts will appear here once connected</p>
        </div>
      </section>

      <section className="py-10 bg-[#0A66C2]" data-testid="export-banner">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 reveal">
            <div className="flex items-center gap-4 text-white">
              <Globe size={36} className="shrink-0 text-white/70" />
              <div>
                <p className="text-xl font-bold font-['Chivo']">Open for Global Projects</p>
                <p className="text-blue-200 text-sm">Engineering Excellence from India</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex gap-3">
                {["ISO 9001:2015", "ZED Certified", "ADNOC Approved"].map((badge) => (
                  <span key={badge} className="text-xs font-bold bg-white/15 text-white border border-white/30 px-3 py-1.5 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
              <Link to="/quality" className="bg-white text-[#0A66C2] px-6 py-2.5 rounded-sm font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
                View Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0F172A]" data-testid="cta-banner" ref={ctaRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center reveal">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-['Chivo']">Ready to Start Your Project?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">Contact us today for a free consultation. Our team is ready to bring your fabrication needs to life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowInquire(true)}
              className="bg-[#0A66C2] text-white px-8 py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors pulse-glow"
              data-testid="cta-inquire-btn"
            >
              Inquire Now
            </button>
            <a href="https://wa.me/918043748186" target="_blank" rel="noreferrer" className="border border-slate-600 text-slate-300 px-8 py-3 rounded-sm font-semibold hover:border-white hover:text-white transition-colors" data-testid="cta-whatsapp-btn">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
    </main>
  );
}