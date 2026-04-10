import { useEffect, useMemo, useState } from "react";
import { Trash2, Star, StarOff, LogOut, PlusCircle, ImagePlus } from "lucide-react";
import { getProjects, saveProjects, initializeProjects } from "../data/projectsData";

const ADMIN_PASSWORD = "dfab@admin 2026";
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

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects]
  );

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

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        img: reader.result,
      }));
      setImageName(file.name);
    };

    reader.readAsDataURL(file);
  };

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!form.title || !form.tag || !form.desc || !form.img) {
      alert("Please fill all fields and upload an image.");
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

    let updatedProjects = [newProject, ...projects];

    updatedProjects = [
      ...updatedProjects.filter((p) => p.featured),
      ...updatedProjects.filter((p) => !p.featured),
    ];

    setProjects(updatedProjects);
    saveProjects(updatedProjects);

    setForm(EMPTY_FORM);
    setImageName("");

    alert("Project added successfully.");
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const toggleFeatured = (id) => {
    let updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );

    updatedProjects = [
      ...updatedProjects.filter((p) => p.featured),
      ...updatedProjects.filter((p) => !p.featured),
    ];

    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
              DFAB Admin
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 font-['Chivo']">
              Projects Admin Panel
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Enter password to manage projects
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A66C2] text-white py-3 rounded-xl font-semibold hover:bg-[#084e96] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#0F172A] py-14 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
              Admin
            </span>
            <h1 className="text-4xl font-bold text-white mt-2 font-['Chivo']">
              Manage Projects
            </h1>
            <p className="text-slate-300 mt-3">
              Add new projects and control what appears on the home page.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
            <h2 className="text-2xl font-bold text-slate-900 font-['Chivo']">
              Add New Project
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Upload image from your device and add project details.
            </p>

            <form onSubmit={handleAddProject} className="mt-6 space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project title"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />

              <input
                type="text"
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Project tag"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />

              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Project description"
                rows="5"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />

              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                  <ImagePlus size={18} className="text-[#0A66C2]" />
                  Upload Project Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#0A66C2] file:text-white file:font-semibold hover:file:bg-[#084e96]"
                />

                {imageName && (
                  <p className="text-sm text-slate-500 mt-3">
                    Selected file: <span className="font-medium">{imageName}</span>
                  </p>
                )}

                {form.img && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <img
                      src={form.img}
                      alt="Preview"
                      className="w-full h-52 object-cover"
                    />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#0A66C2]"
                />
                Show this project in Home page featured section
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-3 rounded-xl font-semibold hover:bg-[#084e96] transition-colors"
              >
                <PlusCircle size={18} />
                Add Project
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
              <p className="font-semibold">Home Page Update Logic</p>
              <p className="mt-2">
                The first <span className="font-bold text-[#0A66C2]">3 featured projects</span> will be shown on the Home page.
              </p>
              <p className="mt-1">
                Current featured count:{" "}
                <span className="font-bold text-[#0A66C2]">
                  {featuredProjects.length}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-slate-900 font-['Chivo']">
              Existing Projects
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Added projects appear here and align automatically in the Projects page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <span className="inline-block bg-[#0A66C2] text-white text-xs px-3 py-1 rounded-full mb-3">
                      {project.tag}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 font-['Chivo']">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-3 leading-6 line-clamp-4">
                      {project.desc}
                    </p>

                    <div className="flex items-center gap-3 mt-5 flex-wrap">
                      <button
                        onClick={() => toggleFeatured(project.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          project.featured
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {project.featured ? <Star size={16} /> : <StarOff size={16} />}
                        {project.featured ? "Featured" : "Make Featured"}
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                No projects added yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}