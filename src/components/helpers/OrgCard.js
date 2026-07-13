import { useState } from "react";

// A single organization / camp card with an initials avatar and
// a "read more" toggle for long descriptions.
export default function OrgCard({ item }) {
  const [open, setOpen] = useState(false);
  const long = item.body && item.body.length > 160;
  const text = open || !long ? item.body : item.body.slice(0, 110).trimEnd() + "…";

  return (
    <div className="card">
      <div className="avatar" aria-hidden="true">
        {item.logo ? <img src={item.logo} alt="" /> : item.initials}
      </div>
      <div className="card__body">
        <div className="card__title">{item.title}</div>
        <div className="card__meta">
          {item.org}
          {item.dates ? (
            <>
              {" "}
              <span className="dates">· {item.dates}</span>
            </>
          ) : null}
        </div>
        <p className="card__text">{text}</p>
        {long && (
          <button className="card__link" onClick={() => setOpen((o) => !o)}>
            {open ? "Show less" : "Read more"}
          </button>
        )}
        {item.link && (
          <>
            {" "}
            <a
              className="card__link"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
          </>
        )}
      </div>
    </div>
  );
}
