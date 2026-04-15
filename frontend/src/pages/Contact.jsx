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
  Paperclip,
} from "lucide-react";
import axios from "axios";

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
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("message", form.message);
    if (form.phone) formData.append("phone", form.phone);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(`${API}/contact`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      if (response.data?.status === "success") {
        setStatus({
          type: "success",
          msg: response.data.message || "Your inquiry has been submitted successfully.",
        });
        setForm(EMPTY);
        setFile(null);
        document.getElementById("file-upload").value = "";
      } else {
        setStatus({ type: "error", msg: "Unexpected response from server." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Something went wrong. Please try later." });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onFileChange = (e) => setFile(e.target.files[0]);

  return (
    <main className="bg-white">
      
      {/* HEADER SECTION - Standardized */}
      <div className="bg-[#0F172A] h-[260px] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 font-['Chivo']">Contact Us</h1>
          <p className="text-slate-400 mt-3 max-w-2xl">
Reach out to our team today. We are ready to help you engineer high-precision solutions tailored to your specific industrial needs.          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 items-stretch">
            {/* Box 1: Contact Details */}
            <div className="lg:col-span-2 border border-slate-200 p-8 rounded-md shadow-sm flex flex-col justify-between bg-white h-full">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Reach Us</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2 font-['Chivo']">Let's Talk About Your Project</h2>
                  <p className="text-slate-600 mt-3 text-sm leading-relaxed">Contact our team for inquiries, quotations, or technical discussions.</p>
                </div>

                <div className="flex gap-4">
                  <div className="text-[#0A66C2] shrink-0 mt-1"><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Visit Us</h4>
                    <p className="text-slate-600 text-sm mt-1">No: 3B/415, KIADB Main Road, Peenya Industrial Area, Bengaluru – 560058</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-[#0A66C2] shrink-0 mt-1"><Phone size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Call Us</h4>
                    <a href="tel:+918428866121" className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block">8428866121</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-[#0A66C2] shrink-0 mt-1"><Mail size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Us</h4>
                    <a href="mailto:info@dfab.in" className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block">info@dfab.in</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-[#0A66C2] shrink-0 mt-1"><MessageCircle size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">WhatsApp</h4>
                    <a href="https://api.whatsapp.com/send?phone=918428866121" target="_blank" rel="noreferrer" className="text-sm text-[#0A66C2] hover:underline mt-1 inline-block">+91 8428866121</a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a href="https://api.whatsapp.com/send?phone=918428866121" target="_blank" rel="noreferrer" className="block text-center bg-[#25D366] hover:bg-[#1fb457] text-white py-3 rounded-md font-semibold transition-colors">Chat on WhatsApp</a>
              </div>
            </div>

            {/* Box 2: Form */}
            <div className="lg:col-span-3 border border-slate-200 p-8 rounded-md shadow-sm bg-white h-full flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-slate-900 font-['Chivo']">Send Us a Message</h3>

              {status && (
                <div className={`flex items-start gap-3 p-4 mb-6 rounded-md text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-600"}`}>
                  {status.type === "success" ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                  <span>{status.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <input name="name" value={form.name} onChange={onChange} required placeholder="Name" className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" />
                  <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="Email" className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" />
                  <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" />
                  <input name="subject" value={form.subject} onChange={onChange} required placeholder="Subject" className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" />
                  <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Message" className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] resize-none" />

                  <div className="relative">
                    <input type="file" id="file-upload" onChange={onFileChange} className="hidden" />
                    <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-slate-300 rounded-md p-3 text-sm text-slate-600 hover:bg-slate-50 hover:border-[#0A66C2] transition-colors cursor-pointer">
                      <Paperclip size={16} />
                      {file ? <span className="font-medium text-slate-900 truncate">{file.name}</span> : <span>Attach a document (Optional)</span>}
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#084e96] text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-60 mt-4">
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 font-['Chivo']">Our Location</h3>
            <div className="w-full h-[400px] border border-slate-200 rounded-md shadow-sm overflow-hidden bg-slate-50">
              <iframe title="Location" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.054366666666!2d77.5123456!3d13.0123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzQ0LjQiTiA3N8KwMzAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"></iframe>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}