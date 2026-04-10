import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import project4 from "../assets/images/project4.jpg";
import project5 from "../assets/images/project5.jpg";
import project6 from "../assets/images/project6.jpg";

export const DEFAULT_PROJECTS = [
  {
    id: 1,
    img: project1,
    title: "Energy Sector",
    tag: "Pipeline & Welding",
    desc: "We have executed a high-pressure welded pipeline for a steam turbine with 100% radiographic joints welded at the 6G position — meeting the most critical energy sector standards.",
    featured: true,
  },
  {
    id: 2,
    img: project2,
    title: "Pharmaceuticals",
    tag: "Pressure Vessels",
    desc: "We have developed welded stainless steel drug processing equipment and containers qualifying the strict requirements of medical standards for pharmaceutical manufacturing.",
    featured: true,
  },
  {
    id: 3,
    img: project3,
    title: "Locomotive",
    tag: "Structural Fabrication",
    desc: "We have fabricated train seating and coaches, meeting the stringent locomotive safety standards. Precision fabrication for passenger comfort and safety.",
    featured: true,
  },
  {
    id: 4,
    img: project4,
    title: "Aeronautical",
    tag: "Precision Machining",
    desc: "We have developed machined aluminum components for aerospace-grade standards, requiring extremely tight tolerances and advanced machining capabilities.",
    featured: false,
  },
  {
    id: 5,
    img: project5,
    title: "Food & Dairy Industries",
    tag: "Food-Grade Fabrication",
    desc: "We have manufactured welded food-grade stainless steel processing equipment and storage containers qualifying food safety standards.",
    featured: false,
  },
  {
    id: 6,
    img: project6,
    title: "Automotive Industries",
    tag: "Jig & Fixture",
    desc: "We have developed a precision fixture for an automotive seating assembly line component welding to enable mass production, improved productivity and consistent quality.",
    featured: false,
  },
];

export const PROJECTS_STORAGE_KEY = "dfab_projects";

export function initializeProjects() {
  const existing = localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  }
}

export function getProjects() {
  initializeProjects();
  return JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY)) || DEFAULT_PROJECTS;
}

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}