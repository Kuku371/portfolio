import { useState, useEffect } from "react";
import projects from "../data/projects";
import Reveal from "./helpers/Reveal";

/* Popup that loads a source file (e.g. a .py) and shows it with
   copy + download. Defined here so no separate file is needed. */
function CodeModal({ src, title, onClose }) {
  const [code, setCode] = useState("Loading…");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((t) => alive && setCode(t))
      .catch(() => alive && setCode("Couldn't load the source file."));
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      alive = false;
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard blocked — ignore */
    }
  };

  const btn = {
    fontFamily: "var(--mono)",
    fontSize: "0.78rem",
    padding: "6px 11px",
    borderRadius: "8px",
    border: "1px solid var(--border-strong)",
    background: "transparent",
    color: "var(--text)",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div className="lightbox" onClick={onClose} style={{ cursor: "default" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 94vw)",
          maxHeight: "86vh",
          background: "var(--surface-solid)",
          border: "1px solid var(--border-strong)",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor: "default",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "14px 16px",
            borderBottom: "1px solid var(--border)",
            fontFamily: "var(--mono)",
          }}
        >
          <span style={{ color: "var(--page-accent)" }}>{title}</span>
          <span style={{ display: "flex", gap: "8px" }}>
            <button style={btn} onClick={copy}>
              {copied ? "copied ✓" : "copy"}
            </button>
            <a style={btn} href={src} download>
              download
            </a>
            <button style={btn} onClick={onClose}>
              esc ✕
            </button>
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "18px 20px",
            overflow: "auto",
            fontFamily: "var(--mono)",
            fontSize: "0.8rem",
            lineHeight: 1.55,
            color: "var(--text)",
            whiteSpace: "pre",
            tabSize: 4,
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
}

function ProjectCard({ p, onViewCode }) {
  return (
    <div className="project">
      <div className="project__shot">
        {p.image ? (
          <img src={p.image} alt={p.title} />
        ) : (
          <span className="ph">screenshot coming soon</span>
        )}
      </div>
      <div className="project__body">
        <h3 className="project__title">{p.title}</h3>
        <div className="project__tags">
          {p.tags.map((t, i) => (
            <span className="tag" key={i}>
              {t}
            </span>
          ))}
        </div>
        <p className="project__text">{p.body}</p>

        <div className="project__links">
          {p.playHref && (
            <a
              className="btn"
              href={p.playHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play ▶
            </a>
          )}
          {p.code && (
            <button className="btn" onClick={() => onViewCode(p.code, p.title)}>
              View code
            </button>
          )}
          {p.links &&
            p.links.map((l, i) =>
              l.href ? (
                <a
                  key={i}
                  className="btn"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ) : (
                <span key={i} className="btn btn--muted">
                  {l.label}
                </span>
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [codeView, setCodeView] = useState(null); // { src, title }

  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">projects</div>
        <h1>Projects &amp; Research</h1>
        <p>Things I've built, written, and researched.</p>
      </div>

      <section className="section">
        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 70, 210)}>
              <ProjectCard
                p={p}
                onViewCode={(src, title) => setCodeView({ src, title })}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {codeView && (
        <CodeModal
          src={codeView.src}
          title={codeView.title}
          onClose={() => setCodeView(null)}
        />
      )}
    </div>
  );
}
