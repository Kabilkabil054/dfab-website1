import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["All", "Fabrication", "Welding", "Industry News", "Quality", "Projects"];

const SAMPLE_POSTS = [
  {
    id: "sample-1",
    title: "Understanding 6G Pipe Welding Qualification",
    excerpt: "6G is the most demanding pipe welding position. Learn what it takes to qualify and why it matters for critical pipeline projects.",
    category: "Welding",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1763684041948-f254c06b1a05?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-12-01T00:00:00",
    tags: ["welding", "qualification", "pipeline"],
  },
  {
    id: "sample-2",
    title: "ISO 9001:2015 in Industrial Fabrication",
    excerpt: "How ISO 9001:2015 certification drives quality excellence in stainless steel fabrication and what it means for your projects.",
    category: "Quality",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-11-15T00:00:00",
    tags: ["ISO", "quality", "certification"],
  },
  {
    id: "sample-3",
    title: "Pressure Vessel Fabrication Standards",
    excerpt: "A guide to ASME pressure vessel codes and how DFAB ensures compliance for pharma and dairy applications.",
    category: "Fabrication",
    author: "DFAB Team",
    image_url: "https://images.unsplash.com/photo-1513828170880-00eeeac21306?crop=entropy&cs=srgb&fm=jpg&q=85",
    created_at: "2024-11-01T00:00:00",
    tags: ["pressure vessel", "ASME", "pharma"],
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
    <main className="bg-white">

      {/* ✅ UPDATED HEADER (FIXED SIZE) */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            Knowledge Hub
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Our Blog
          </h1>

          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </div>
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#0A66C2] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 h-48 rounded-md mb-4" />
                  <div className="bg-slate-200 h-4 rounded mb-2" />
                  <div className="bg-slate-200 h-4 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-slate-200 rounded-md overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-sm">No Image</span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0A66C2] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {post.author}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Chivo']">
                      {post.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.id}`}
                      state={{ post }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A66C2]"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 text-right">
            <Link
              to="/blog/admin"
              className="text-sm text-slate-400 hover:text-[#0A66C2]"
            >
              Admin Panel
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}