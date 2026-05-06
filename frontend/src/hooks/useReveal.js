import { useEffect, useRef } from "react";

/**
 * Adds intersection observer to trigger .reveal / .reveal-left / .reveal-right
 * animations when elements enter the viewport.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    // Observe this element and all reveal children
    const targets = [el, ...el.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")];
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
