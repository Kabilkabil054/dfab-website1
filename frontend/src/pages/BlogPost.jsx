import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPost() {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!post) {
      axios
        .get(`${API}/blog/posts/${id}`)
        .then((r) => setPost(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id, post]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#0A66C2] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 font-['Chivo']">Post Not Found</h2>
        <Link to="/blog" className="text-[#0A66C2] hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* Header */}
      {post.image_url && (
        <div className="relative h-72 md:h-96">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 md:px-8 pb-10 w-full">
              <span className="inline-block bg-[#0A66C2] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{post.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-['Chivo']">{post.title}</h1>
            </div>
          </div>
        </div>
      )}

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-200">
            <Link to="/blog" className="flex items-center gap-1 text-[#0A66C2] hover:underline font-medium">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.created_at)}</span>
            <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="flex items-center gap-1 ml-auto hover:text-[#0A66C2] transition-colors"
              data-testid="blog-share-btn"
            >
              <Share2 size={14} /> Share
            </button>
          </div>

          {!post.image_url && (
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Chivo']">{post.title}</h1>
          )}

          {/* Excerpt */}
          <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-[#0A66C2] pl-5">
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap"
            data-testid="blog-post-content"
          >
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-200">
              <Tag size={16} className="text-slate-400 mt-0.5" />
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {/* Back CTA */}
          <div className="mt-12 text-center bg-slate-50 rounded-md p-8">
            <h3 className="font-bold text-slate-900 mb-2 font-['Chivo']">Have a Project in Mind?</h3>
            <p className="text-sm text-slate-600 mb-4">Contact DFAB for a free consultation and quote.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
              data-testid="blog-post-contact-btn"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
