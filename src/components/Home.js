import { useEffect, useRef, useState } from "react";
import profile from "../data/profile";
import faqs from "../data/faqs";
import Reveal from "./helpers/Reveal";
import Lightbox from "./helpers/Lightbox";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "highlights", label: "highlights" },
  { id: "faq", label: "faq" },
];

function Contact({ c }) {
  const inner = (
    <span className="chip">
      <span className="chip__k">{c.label}</span>
      <span className="chip__v">{c.value}</span>
    </span>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <span title="Discord username">{inner}</span>
  );
}

function Hero({ onExpand }) {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <Reveal>
          <div
            className="hero__photo"
            onClick={onExpand}
            onKeyDown={(e) => (e.key === "Enter" ? onExpand() : null)}
            role="button"
            tabIndex={0}
            aria-label="Expand photo"
          >
            <img src={profile.photo} alt={profile.name} />
            <span className="expand-hint">click to expand</span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h1 className="hero__name">{profile.name}</h1>
            <div className="hero__role">
              {profile.role} · {profile.location}
            </div>
            <div className="hero__tagline">{profile.tagline}</div>
            <p className="hero__blurb">{profile.blurb}</p>
            <blockquote className="hero__quote">
              “{profile.quote}”
              — {profile.quoteAuthor}
            </blockquote>
            <div className="hero__contacts">
              {profile.contacts.map((c) => (
                <Contact key={c.label} c={c} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScrollSpy({ active, onJump }) {
  return (
    <aside className="spy" aria-label="Section navigation">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`spy__item ${active === s.id ? "active" : ""}`}
          onClick={() => onJump(s.id)}
        >
          <span className="idx">0{i + 1}</span>
          <span className="lbl">{s.label}</span>
        </button>
      ))}
    </aside>
  );
}

function Faq() {
  const [open, setOpen] = useState(-1); // nothing open on load
  const timer = useRef(null);

  const handleToggle = (i) => {
    clearTimeout(timer.current);
    if (open === i) {
      setOpen(-1); // clicking the open one just closes it
      return;
    }
    if (open === -1) {
      setOpen(i); // nothing open yet — open directly
      return;
    }
    setOpen(-1); // close the current one first...
    timer.current = setTimeout(() => setOpen(i), 400); // ...then open the new one (matches .acc__panel's 0.4s transition)
  };

  return (
    <div className="accordion">
      {faqs.map((f, i) => (
        <div key={i} className={`acc__item ${open === i ? "open" : ""}`}>
          <button
            className="acc__btn"
            onClick={() => handleToggle(i)}
            aria-expanded={open === i}
          >
            <span>{f.q}</span>
            <span className="sign">+</span>
          </button>
          <div
            className="acc__panel"
            style={{ maxHeight: open === i ? "800px" : "0" }}
          >
            <div className="acc__panel-inner">{f.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("about");
  const [lightbox, setLightbox] = useState(false);
  const refs = useRef({});
  const lockRef = useRef(false); // true while a click-jump is settling
  const lockTimer = useRef(null);

  useEffect(() => {
    // Active = the last section whose top has scrolled past a line near the top
    // of the viewport. Basing this on section tops (rather than which section
    // covers a center band) means a short section like "highlights" stays
    // selected instead of getting skipped for the section below it.
    const computeActive = () => {
      if (lockRef.current) return; // don't fight a click-jump mid-scroll
      const line = window.innerHeight * 0.3;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = refs.current[s.id];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  const jump = (id) => {
    const el = refs.current[id];
    if (!el) return;
    setActive(id); // highlight immediately on click...
    lockRef.current = true; // ...and hold it there while the smooth scroll runs
    clearTimeout(lockTimer.current);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 700);
  };

  const setRef = (id) => (el) => {
    refs.current[id] = el;
  };

  return (
    <>
      <Hero onExpand={() => setLightbox(true)} />

      <div className="wrap home-body">
        <ScrollSpy active={active} onJump={jump} />

        <div className="home-sections">
          <section id="about" ref={setRef("about")} className="home-section">
            <Reveal>
              <div className="eyebrow">about</div>
              <h2>Who I am</h2>
              {profile.about.map((p, i) => (
                <p key={i} className="about-text">
                  {p}
                </p>
              ))}
            </Reveal>
          </section>

          <section
            id="highlights"
            ref={setRef("highlights")}
            className="home-section"
          >
            <Reveal>
              <div className="eyebrow">highlights</div>
              <h2>Recognitions</h2>
              <div className="highlights">
                {profile.highlights.map((h, i) => (
                  <div className="highlight" key={i}>
                    {h.stat ? <div className="stat">{h.stat}</div> : null}
                    <div className="h-label">{h.label}</div>
                    <div className="h-detail">{h.detail}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="faq" ref={setRef("faq")} className="home-section">
            <Reveal>
              <div className="eyebrow">faq</div>
              <h2>Frequently Asked Questions</h2>
              <Faq />
            </Reveal>
          </section>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={profile.photo}
          alt={profile.name}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  );
}
