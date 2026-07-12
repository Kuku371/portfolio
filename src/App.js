import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "./components/helpers/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Studies from "./components/Studies";
import Groups from "./components/Groups";
import Projects from "./components/Projects";

// Each page gets its own accent color for borders/labels.
const ACCENTS = {
  "/": { accent: "var(--blue)", soft: "var(--blue-soft)" },
  "/studies": { accent: "var(--blue)", soft: "var(--blue-soft)" },
  "/groups": { accent: "var(--green)", soft: "var(--green-soft)" },
  "/projects": { accent: "var(--cyan)", soft: "var(--cyan-soft)" },
};

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    const a = ACCENTS[location.pathname] || ACCENTS["/"];
    document.documentElement.style.setProperty("--page-accent", a.accent);
    document.documentElement.style.setProperty("--page-accent-soft", a.soft);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function Shell() {
  return (
    <div className="app">
      <RouteEffects />
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </ThemeProvider>
  );
}
