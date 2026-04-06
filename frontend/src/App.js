import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Capabilities from "./pages/Capabilities";
import Quality from "./pages/Quality";
import Careers from "./pages/Careers";
import Projects from "./pages/Projects";
import Infrastructure from "./pages/Infrastructure";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import Contact from "./pages/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatBot from "./components/ChatBot";

// Global intersection observer for scroll reveal animations
function GlobalReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    const observe = () => {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => observer.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalReveal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/blog/admin" element={<BlogAdmin />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
      </BrowserRouter>
    </div>
  );
}

export default App;
