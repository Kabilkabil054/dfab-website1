import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, LogOut, X, Save } from "lucide-react";

const PASSWORD = "dfab@admin2026";

const EMPTY_FORM = {
  role: "",
  location: "",
  type: "Full Time",
  experience: "",
  desc: "",
  requirements: "",
};

export default function CareerAdmin() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("career_admin") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("careers_data") || "[]");
    setJobs(savedJobs);
  }, []);

  const saveJobs = (updatedJobs) => {
    localStorage.setItem("careers_data", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password === PASSWORD) {
      localStorage.setItem("career_admin", "true");
      setLoggedIn(true);
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("career_admin");
    setLoggedIn(false);
  };

  const openCreate = () => {
    setEditingIndex(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (job, index) => {
    setEditingIndex(index);
    setForm({
      role: job.role || "",
      location: job.location || "",
      type: job.type || "Full Time",
      experience: job.experience || "",
      desc: job.desc || "",
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join(", ")
        : "",
    });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const jobData = {
      id:
        form.role
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") + "-" + Date.now(),
      role: form.role,
      location: form.location,
      type: form.type,
      experience: form.experience,
      desc: form.desc,
      requirements: form.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    const updatedJobs = [...jobs];

    if (editingIndex !== null) {
      updatedJobs[editingIndex] = {
        ...updatedJobs[editingIndex],
        ...jobData,
      };
    } else {
      updatedJobs.push(jobData);
    }

    saveJobs(updatedJobs);
    setShowForm(false);
    setEditingIndex(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this job opening?")) return;
    const updatedJobs = jobs.filter((_, i) => i !== index);
    saveJobs(updatedJobs);
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-md p-10 w-full max-w-md shadow-sm">
          <div className="text-center mb-8">
            <span className="font-bold text-2xl text-[#0A66C2] font-['Chivo']">DFAB</span>
            <p className="text-slate-600 mt-1 text-sm">Career Admin Panel</p>
          </div>

          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] mb-4"
              required
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#0A66C2] text-white py-3 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/careers" className="text-sm text-slate-500 hover:text-[#0A66C2]">
              Back to Careers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg text-[#0A66C2] font-['Chivo']">DFAB</span>
            <span className="text-slate-600 text-sm ml-2">Career Admin</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/careers" className="text-sm text-slate-600 hover:text-[#0A66C2] transition-colors">
              View Careers
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Chivo']">Career Openings</h1>
            <p className="text-sm text-slate-500 mt-1">{jobs.length} jobs total</p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
          >
            <Plus size={18} /> New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-md border border-slate-200">
            <p className="text-slate-500 mb-4">No job openings yet.</p>
            <button onClick={openCreate} className="text-[#0A66C2] font-semibold hover:underline">
              Create your first job opening
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                    Location
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                    Experience
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job, index) => (
                  <tr key={job.id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{job.role}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{job.desc}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-slate-600">{job.location}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="bg-blue-50 text-[#0A66C2] text-xs font-medium px-2.5 py-1 rounded-full">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-slate-500">{job.experience}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(job, index)}
                          className="p-1.5 text-slate-500 hover:text-[#0A66C2] transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                        >
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

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-md shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 font-['Chivo']">
                {editingIndex !== null ? "Edit Job" : "New Job"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role *</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                  className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  placeholder="Job role"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                    className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    placeholder="Peenya, Bengaluru"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Experience *</label>
                  <input
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    required
                    className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    placeholder="2–5 years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  required
                  rows={5}
                  className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  placeholder="Job description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Requirements (comma separated)
                </label>
                <input
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  placeholder="Drawing reading, TIG welding, CNC bending"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors"
                >
                  <Save size={16} /> {editingIndex !== null ? "Update Job" : "Create Job"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 transition-colors"
                >
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