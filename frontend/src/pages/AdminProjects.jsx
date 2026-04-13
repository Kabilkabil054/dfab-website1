import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Star, StarOff, LogOut, PlusCircle, ImagePlus, LayoutGrid, ArrowLeft, Pencil, X } from "lucide-react";
import { getProjects, saveProjects, initializeProjects } from "../data/projectsData";

const ADMIN_PASSWORD = "dfab@admin2026";
const ADMIN_SESSION_KEY = "dfab_admin_logged_in";

const EMPTY_FORM = {
  title: "",
  tag: "",
  desc: "",
  img: "",
  featured: false,
};

export default function AdminProjects() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageName, setImageName] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which project is being edited

  useEffect(() => {
    initializeProjects();
    setProjects(getProjects());
    setIsLoggedIn(localStorage.getItem(ADMIN_SESSION_KEY) === "true");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsLoggedIn(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, img: reader.result }));
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.tag || !form.desc || !form.img) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      // UPDATE EXISTING PROJECT
      const updated = projects.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
      setProjects(updated);
      saveProjects(updated);
      setEditingId(null);
      alert("Project Updated Successfully!");
    } else {
      // ADD NEW PROJECT
      const newProject = { ...form, id: Date.now() };
      const updated = [newProject, ...projects];
      setProjects(updated);
      saveProjects(updated);
      alert("Project Published Successfully!");
    }

    setForm(EMPTY_FORM);
    setImageName("");
  };

  const startEdit = (project) => {
    setForm({
      title: project.title,
      tag: project.tag,
      desc: project.desc,
      img: project.img,
      featured: project.featured,
    });
    setEditingId(project.id);
    setImageName("Current Image (Click to change)");
    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageName("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      if (editingId === id) cancelEdit();
    }
  };

  const toggleFeatured = (id) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProjects(updated);
    saveProjects(updated);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-[#0A66C2] rounded-full flex items-center justify-center mx-auto mb-4">
               <LayoutGrid size={32} />
            </div>
            <h1 className="text-2xl font-bold font-['Chivo'] text-slate-900">Admin Authentication</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#0A66C2] transition-all"
            />
            <button type="submit" className="w-full bg-[#0A66C2] text-white py-4 rounded-xl font-bold hover:bg-[#084e96] transition-all">
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0A66C2] transition-colors">
              <ArrowLeft size={16} /> Back to Projects Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-[#0F172A] py-10 px-4 mb-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Chivo'] tracking-tight">System Console</h1>
            <p className="text-blue-300/60 text-sm font-medium uppercase tracking-[0.2em] mt-1">Project Management</p>
          </div>
          <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
            <LogOut size={18} /> Logout Session
          </button>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* LEFT SIDE: FORM (ADD/EDIT) */}
          <div className={`bg-white rounded-3xl border transition-all duration-500 shadow-sm overflow-hidden flex flex-col h-[850px] ${editingId ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200'}`}>
            <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className={`p-2 rounded-lg ${editingId ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-[#0A66C2]'}`}>
                     {editingId ? <Pencil size={20} /> : <PlusCircle size={20} />}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-['Chivo']">
                    {editingId ? "Edit Project" : "Project Creator"}
                  </h2>
                </div>
                <p className="text-sm text-slate-500">{editingId ? "Modify the details of your existing project." : "Draft and publish new project entries."}</p>
              </div>
              {editingId && (
                <button onClick={cancelEdit} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Project Identity</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#0A66C2] bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Classification</label>
                  <input
                    type="text"
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#0A66C2] bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Narrative</label>
                  <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    placeholder="Description..."
                    rows="6"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#0A66C2] bg-slate-50/50 resize-none"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Visual Asset</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/50 text-center relative group">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <ImagePlus size={24} className="text-slate-300 group-hover:text-[#0A66C2] mx-auto mb-2 transition-colors" />
                    <span className="text-xs font-bold text-slate-600 block">Upload Media</span>
                  </div>
                  {imageName && <p className="text-[10px] text-[#0A66C2] mt-2 font-black truncate text-center">{imageName}</p>}
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                  <input type="checkbox" id="f-check" name="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 accent-[#0A66C2] cursor-pointer" />
                  <label htmlFor="f-check" className="text-xs font-black text-slate-700 uppercase tracking-tighter cursor-pointer">Pin to Homepage Featured</label>
                </div>
              </div>

              <div className="flex gap-4">
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="flex-1 bg-slate-200 text-slate-600 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-300 transition-all mt-4">
                    Discard
                  </button>
                )}
                <button type="submit" className={`flex-[2] text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl mt-4 ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-[#0A66C2] hover:bg-[#084e96] shadow-blue-100'}`}>
                  {editingId ? "Update Project" : "Publish Entry"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE: SCROLLABLE DATABASE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[850px]">
            <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <LayoutGrid size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-['Chivo']">Project Database</h2>
                </div>
                <p className="text-sm text-slate-500">Manage all active portfolios.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-[#0A66C2]">{projects.length}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Units</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
              <div className="grid grid-cols-1 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className={`bg-white rounded-3xl overflow-hidden border transition-all hover:shadow-xl group ${editingId === project.id ? 'border-amber-400 ring-2 ring-amber-50 shadow-lg' : 'border-slate-200 shadow-md'}`}>
                    <div className="h-48 relative bg-slate-200 overflow-hidden">
                      <img src={project.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                          {project.tag}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-['Chivo'] mb-1">{project.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{project.desc}</p>
                      
                      <div className="flex gap-2 border-t border-slate-50 pt-4">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                            project.featured 
                            ? "bg-amber-50 text-amber-600 border-amber-200" 
                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {project.featured ? <Star size={12} className="fill-amber-600" /> : <StarOff size={12} />}
                        </button>

                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => startEdit(project)}
                          className="flex-1 bg-blue-50 text-[#0A66C2] border border-blue-100 hover:bg-blue-100 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {projects.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center py-20 text-slate-300">
                  <PlusCircle size={48} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Database Empty</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </main>
  );
}