import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const r = await axios.post(`${API}/contact`, form);
      setStatus({ type: "success", msg: r.data.message });
      setForm(EMPTY);
    } catch {
      setStatus({ type: "error", msg: "Failed to submit. Please try again or call us directly." });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <main className="bg-white">
      {/* Header */}
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
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Reach Us</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2 font-['Chivo']">Let's Talk About Your Project</h2>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                  Contact our team for inquiries, quotations or technical discussions. We respond within 24 hours.
                </p>
              </div>

              {[
                {
                  icon: <MapPin size={20} />,
                  title: "Visit Us",
                  lines: [
                    "No: 3B/415, No-8 KIADB Main Road,",
                    "1st Stage, 2nd Phase, Peenya Industrial Area,",
                    "Opp. BWSSB, Bengaluru – 560058",
                  ],
                },
                {
                  icon: <Phone size={20} />,
                  title: "Call Us",
                  lines: ["080 43748186"],
                  href: "tel:+918043748186",
                },
                {
                  icon: <Mail size={20} />,
                  title: "Email Us",
                  lines: ["info@dfab.in"],
                  href: "mailto:info@dfab.in",
                },
                {
                  icon: <MessageCircle size={20} />,
                  title: "WhatsApp",
                  lines: ["+91 80437 48186"],
                  href: "https://wa.me/918043748186",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-slate-50 rounded-md border border-slate-200" data-testid={`contact-info-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center text-[#0A66C2] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm text-[#0A66C2] hover:underline mt-0.5 block">
                        {item.lines[0]}
                      </a>
                    ) : (
                      item.lines.map((l) => <p key={l} className="text-sm text-slate-600 mt-0.5">{l}</p>)
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/918043748186"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
                data-testid="contact-whatsapp-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.861L.054 23.761a.5.5 0 00.609.634l6.101-1.6A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.073-1.387l-.36-.214-3.742.981.999-3.648-.235-.374A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-['Chivo']">Send Us a Message</h3>

                {status && (
                  <div className={`flex items-start gap-3 p-4 rounded-md mb-6 text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-600"}`} data-testid="contact-status-msg">
                    {status.type === "success" ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-shadow" data-testid="contact-name-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="your@email.com" className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-shadow" data-testid="contact-email-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-shadow" data-testid="contact-phone-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                      <input name="subject" value={form.subject} onChange={onChange} required placeholder="Project inquiry, Quote, etc." className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-shadow" data-testid="contact-subject-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={onChange} required rows={6} placeholder="Describe your project or inquiry..." className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-shadow resize-none" data-testid="contact-message-input" />
                  </div>
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0A66C2] text-white px-8 py-3.5 rounded-sm font-semibold hover:bg-[#084e96] transition-colors disabled:opacity-60 w-full justify-center" data-testid="contact-submit-btn">
                    <Send size={16} />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Google Maps */}
              <div className="mt-8 rounded-md overflow-hidden border border-slate-200 shadow-sm" data-testid="google-maps">
                <iframe
                  title="DFAB Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.078543285!2d77.5150!3d13.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d4b00000001%3A0x0!2sPeenya%20Industrial%20Area%2C%20Bengaluru%2C%20Karnataka%20560058!5e0!3m2!1sen!2sin!4v1628000000000!5m2!1sen!2sin"
                  width="100%" height="300" style={{ border: 0 }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
