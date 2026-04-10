import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Trash2, Star, StarOff, LogOut, PlusCircle, ImagePlus, LayoutGrid, ArrowLeft } from "lucide-react";
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

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!form.title || !form.tag || !form.desc || !form.img) {
      alert("Please fill all fields.");
      return;
    }
    const newProject = {
      id: Date.now(),
      title: form.title,
      tag: form.tag,
      desc: form.desc,
      img: form.img,
      featured: form.featured,
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveProjects(updated);
    setForm(EMPTY_FORM);
    setImageName("");
    alert("Project Published Successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
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

          {/* BACK TO PROJECTS BUTTON */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0A66C2] transition-colors"
            >
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
          
          {/* LEFT SIDE: IDLE FORM */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[850px]">
            <div className="p-8 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0A66C2]">
                   <PlusCircle size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-['Chivo']">Project Creator</h2>
              </div>
              <p className="text-sm text-slate-500">Draft and publish new project entries.</p>
            </div>

            <form onSubmit={handleAddProject} className="p-8 space-y-6 flex-grow">
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
                    rows="4"
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

              <button type="submit" className="w-full bg-[#0A66C2] text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#084e96] transition-all shadow-xl shadow-blue-100 mt-4">
                Publish Entry
              </button>
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
                  <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md transition-all hover:shadow-xl group">
                    <div className="h-56 relative bg-slate-200 overflow-hidden">
                      <img src={project.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                          {project.tag}
                        </span>
                        {project.featured && (
                          <span className="bg-[#0A66C2] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-sm">
                            <Star size={10} className="fill-white" /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 font-['Chivo'] mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">{project.desc}</p>
                      
                      <div className="flex gap-3 border-t border-slate-50 pt-5">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                            project.featured 
                            ? "bg-amber-50 text-amber-600 border-amber-200" 
                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {project.featured ? <Star size={14} className="fill-amber-600" /> : <StarOff size={14} />}
                          {project.featured ? "Featured" : "Feature"}
                        </button>
                        
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-6 py-3.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center"
                        >
                          <Trash2 size={18} />
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