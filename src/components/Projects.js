import projects from "../data/projects";
import Reveal from "./helpers/Reveal";

function ProjectCard({ p }) {
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
        {p.links && p.links.length > 0 && (
          <div className="project__links">
            {p.links.map((l, i) =>
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
        )}
      </div>
    </div>
  );
}

export default function Projects() {
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
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
