import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, Settings } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["All", "Fabrication", "Welding", "Industry News", "Quality", "Projects"];

// Sample data includes full content for demonstration
const SAMPLE_POSTS = [
  {
    id: "sample-1",
    title: "Understanding 6G Pipe Welding Qualification",
    content: "6G is the most demanding pipe welding position. It involves a 45-degree angle that tests a welder's ability to handle all directions. \n\nIn industrial fabrication, qualifying for 6G means the welder is capable of welding in all positions (1G, 2G, 5G). This is critical for pipeline projects where pipes cannot be rotated. The process requires immense control over the weld pool to prevent sagging and ensure full penetration at the root. At DFAB, we prioritize these qualifications to ensure structural integrity in high-pressure systems.",
    category: "Welding",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1763684041948-f254c06b1a05?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-12-01T00:00:00",
  },
  {
    id: "sample-2",
    title: "ISO 9001:2015 in Industrial Fabrication",
    content: "ISO 9001:2015 certification is not just a badge; it's a commitment to quality excellence. In the world of stainless steel fabrication, it drives every stage of our workflow. \n\nFrom material traceability to final inspection, our systems are designed to minimize errors and maximize durability. For our clients in the dairy and pharma sectors, this means equipment that meets stringent hygiene and safety standards. Every project documented at DFAB follows these rigorous quality management protocols.",
    category: "Quality",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-11-15T00:00:00",
  },
  {
    id: "sample-3",
    title: "Pressure Vessel Fabrication Standards",
    content: "Fabricating pressure vessels involves adhering to strict ASME codes. These standards ensure that vessels can withstand internal or external pressure safely. \n\nWe focus on specialized welding techniques and non-destructive testing (NDT) to verify the strength of every joint. Whether it is for chemical processing or food storage, DFAB ensures that every vessel is engineered with a high factor of safety and long-term operational reliability.",
    category: "Fabrication",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1513828170880-00eeeac21306?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-11-01T00:00:00",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    axios
      .get(`${API}/blog/posts`)
      .then((r) => {
        setPosts(r.data.length > 0 ? r.data : SAMPLE_POSTS);
      })
      .catch(() => setPosts(SAMPLE_POSTS))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <main className="bg-white relative">
      
      {/* ADMIN BUTTON */}
      <div className="absolute top-4 right-4 z-50 opacity-50 hover:opacity-100 transition-all duration-300">
        <Link
          to="/blog/admin"
          className="flex items-center gap-1.5 px-3 py-2 bg-white/20 text-white/70 hover:text-white hover:bg-[#0A66C2] rounded-lg border border-white/20 hover:border-[#0A66C2] transition-all shadow-lg backdrop-blur-sm"
        >
          <Settings size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest ml-1">Admin</span>
        </Link>
      </div>

      {/* HEADER */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Technical Blog
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
            Direct insights into industrial fabrication and engineering from our technical desk.
          </p>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-[#0A66C2] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 h-[550px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-[550px]"
                >
                  {/* Fixed Image Area */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0A66C2] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* FULL ARTICLE BOX WITH SCROLL */}
                  <div className="p-6 flex flex-col flex-grow overflow-hidden bg-slate-50/30">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 shrink-0">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.created_at)}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 font-['Chivo'] leading-tight border-b border-slate-200 pb-2 shrink-0">
                      {post.title}
                    </h3>

                    {/* Scrollable Full Content Area */}
                    <div className="text-sm text-slate-600 leading-relaxed overflow-y-auto pr-2 custom-scrollbar flex-grow">
                      <p className="text-justify whitespace-pre-line">
                        {/* Displaying post.content directly instead of excerpt */}
                        {post.content || post.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-20 border-t border-slate-100"></div>
        </div>
      </section>

      {/* Internal Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0A66C2;
        }
      `}</style>
    </main>
  );
}