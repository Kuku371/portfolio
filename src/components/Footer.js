import profile from "../data/profile";
import { useTheme } from "./helpers/ThemeContext";

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

export default function Footer() {
  const { theme, toggle } = useTheme();
  return (
    <footer className="footer" id="contact">
      <div className="wrap footer__inner">
        <div className="footer__contacts">
          {profile.contacts.map((c) => (
            <Contact key={c.label} c={c} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? "◐ light" : "◑ dark"}
          </button>
          <span className="footer__meta">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
