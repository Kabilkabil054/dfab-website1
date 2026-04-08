import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

// Temporary hardcoded live backend URL for debugging/live use
const API = "https://dfab-backend.onrender.com/api";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, form, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      });

      if (response.data?.status === "success") {
        setStatus({
          type: "success",
          msg: response.data.message || "Message sent successfully.",
        });
        setForm(EMPTY);
      } else {
        setStatus({
          type: "error",
          msg: "Unexpected response from server.",
        });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      console.error("Response data:", err?.response?.data);
      console.error("Status:", err?.response?.status);

      if (err?.response?.status === 422) {
        setStatus({
          type: "error",
          msg: "Please enter valid details in all required fields.",
        });
      } else if (err?.response?.status === 500) {
        setStatus({
          type: "error",
          msg: "Backend server error. Please try again in a moment.",
        });
      } else if (err?.code === "ECONNABORTED") {
        setStatus({
          type: "error",
          msg: "Request timed out. Render may be waking up. Please try again.",
        });
      } else if (err?.message === "Network Error") {
        setStatus({
          type: "error",
          msg: "Network error. Backend may be blocked or unavailable.",
        });
      } else {
        setStatus({
          type: "error",
          msg: err?.response?.data?.detail || "Server error. Please try later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-white">
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
            Get In Touch
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">
            Contact Us
          </h1>

          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">
                  Reach Us
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2 font-['Chivo']">
                  Let's Talk About Your Project
                </h2>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                  Contact our team for inquiries, quotations, or technical discussions.
                </p>
              </div>

              <div className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md">
                <div className="text-[#0A66C2] shrink-0 mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Visit Us</h4>
                  <p className="text-slate-600 text-sm mt-1">No: 3B/415, KIADB Main Road</p>
                  <p className="text-slate-600 text-sm">Peenya Industrial Area</p>
                  <p className="text-slate-600 text-sm">Bengaluru – 560058</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md">
                <div className="text-[#0A66C2] shrink-0 mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Call Us</h4>
                  <a href="tel:+918428866121" className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block">
                    8428866121
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md">
                <div className="text-[#0A66C2] shrink-0 mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Us</h4>
                  <a href="mailto:info@dfab.in" className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block">
                    info@dfab.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md">
                <div className="text-[#0A66C2] shrink-0 mt-1">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">WhatsApp</h4>
                  <a
                    href="https://wa.me/918428866121"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block"
                  >
                    +91 8428866121
                  </a>
                </div>
              </div>

              <a
                href="https://wa.me/918428866121"
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-[#25D366] hover:bg-[#1fb457] text-white py-3 rounded-md font-semibold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="border border-slate-200 p-8 rounded-md shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-slate-900 font-['Chivo']">
                  Send Us a Message
                </h3>

                {status && (
                  <div
                    className={`flex items-start gap-3 p-4 mb-6 rounded-md text-sm ${
                      status.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-600"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Name"
                    className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="Email"
                    className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone"
                    className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    placeholder="Subject"
                    className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={6}
                    placeholder="Message"
                    className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] resize-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#084e96] text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-60"
                  >
                    <Send size={16} />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}