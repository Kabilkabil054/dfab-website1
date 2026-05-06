import { Link } from "react-router-dom";

export default function PageHero({
  eyebrow = "DFAB",
  title = "Page Title",
  breadcrumbCurrent = "Page",
}) {
  return (
    <section className="relative bg-[#071633] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,102,194,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_35%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-10">
        <div className="animate-pageHeroUp">
          <span className="text-[#0A66C2] text-sm md:text-base font-semibold uppercase tracking-[0.18em] block">
            {eyebrow}
          </span>

          <h1 className="mt-4 text-white text-4xl md:text-5xl lg:text-6xl font-bold font-['Chivo'] tracking-tight">
            {title}
          </h1>

          <div className="mt-8 flex items-center gap-3 text-white/85 text-lg">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{breadcrumbCurrent}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pageHeroUp {
          0% {
            opacity: 0;
            transform: translateY(45px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pageHeroUp {
          animation: pageHeroUp 0.9s ease-out forwards;
        }
      `}</style>
    </section>
  );
}