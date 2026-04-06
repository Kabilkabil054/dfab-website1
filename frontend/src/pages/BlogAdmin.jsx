import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, Eye, EyeOff, LogOut, X, Save } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY_FORM = {
  title: "", content: "", excerpt: "", author: "DFAB Team",
  category: "Fabrication", image_url: "", tags: "", published: true,
};

const CATEGORIES = ["Fabrication", "Welding", "Industry News", "Quality", "Projects", "Technology"];

export default function BlogAdmin() {
  const [token, setToken] = useState(localStorage.getItem("dfab_admin_token") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchPosts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const r = await axios.get(`${API}/admin/blog/posts`, { headers });
      setPosts(r.data);
    } catch {
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const r = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem("dfab_admin_token", r.data.token);
      setToken(r.data.token);
    } catch {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dfab_admin_token");
    setToken("");
    setPosts([]);
  };

  const openCreate = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title, content: post.content, excerpt: post.excerpt,
      author: post.author, category: post.category, image_url: post.image_url || "",
      tags: (post.tags || []).join(", "), published: post.published,
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingPost) {
        await axios.put(`${API}/admin/blog/posts/${editingPost.id}`, payload, { headers });
        setMsg("Post updated successfully!");
      } else {
        await axios.post(`${API}/admin/blog/posts`, payload, { headers });
        setMsg("Post created successfully!");
      }
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      setMsg("Error saving post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await axios.delete(`${API}/admin/blog/posts/${id}`, { headers });
      fetchPosts();
    } catch {
      alert("Error deleting post.");
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-md p-10 w-full max-w-md shadow-sm">
          <div className="text-center mb-8">
            <span className="font-bold text-2xl text-[#0A66C2] font-['Chivo']">DFAB</span>
            <p className="text-slate-600 mt-1 text-sm">Blog Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} data-testid="admin-login-form">
            <label className="block text-sm font-medium text-slate-700 mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] mb-4"
              required
              data-testid="admin-password-input"
            />
            {loginError && <p className="text-red-500 text-sm mb-4" data-testid="admin-login-error">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0A66C2] text-white py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
              data-testid="admin-login-btn"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/blog" className="text-sm text-slate-500 hover:text-[#0A66C2]">Back to Blog</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg text-[#0A66C2] font-['Chivo']">DFAB</span>
            <span className="text-slate-600 text-sm ml-2">Blog Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/blog" className="text-sm text-slate-600 hover:text-[#0A66C2] transition-colors">View Blog</Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-500 transition-colors"
              data-testid="admin-logout-btn"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Chivo']">Blog Posts</h1>
            <p className="text-sm text-slate-500 mt-1">{posts.length} posts total</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
            data-testid="create-post-btn"
          >
            <Plus size={18} /> New Post
          </button>
        </div>

        {msg && <div className={`mb-6 p-4 rounded-md text-sm font-medium ${msg.includes("Error") ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`} data-testid="admin-msg">{msg}</div>}

        {/* Posts Table */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-md border border-slate-200">
            <p className="text-slate-500 mb-4">No blog posts yet.</p>
            <button onClick={openCreate} className="text-[#0A66C2] font-semibold hover:underline">Create your first post</button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-sm" data-testid="admin-posts-table">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors" data-testid={`admin-post-row-${post.id}`}>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900 line-clamp-1">{post.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{post.excerpt}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="bg-blue-50 text-[#0A66C2] text-xs font-medium px-2.5 py-1 rounded-full">{post.category}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{formatDate(post.created_at)}</td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 text-xs font-medium ${post.published ? "text-green-600" : "text-slate-400"}`}>
                        {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(post)} className="p-1.5 text-slate-500 hover:text-[#0A66C2] transition-colors" data-testid={`edit-post-${post.id}`}>
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDelete(post.id, post.title)} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors" data-testid={`delete-post-${post.id}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-8" data-testid="post-form-modal">
          <div className="bg-white rounded-md shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 font-['Chivo']">{editingPost ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 text-slate-400 hover:text-slate-600" data-testid="close-form-btn">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5" data-testid="post-form">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="Post title" data-testid="post-title-input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt *</label>
                <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="Short description" data-testid="post-excerpt-input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content *</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={10} className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="Full post content..." data-testid="post-content-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" data-testid="post-category-select">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="Author name" data-testid="post-author-input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="https://..." data-testid="post-image-input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" placeholder="welding, fabrication, quality" data-testid="post-tags-input" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-[#0A66C2]" data-testid="post-published-checkbox" />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">Published (visible to public)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors disabled:opacity-60" data-testid="post-save-btn">
                  <Save size={16} /> {saving ? "Saving..." : (editingPost ? "Update Post" : "Create Post")}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 transition-colors" data-testid="post-cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
