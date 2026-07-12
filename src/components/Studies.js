import {
  competitionGroups,
  coursework,
  apScores,
  research,
} from "../data/studies";
import Reveal from "./helpers/Reveal";

export default function Studies() {
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">studies</div>
        <h1>Competitions &amp; Coursework</h1>
        <p>
          Competition results, the math I've studied, exam scores, and current
          research.
        </p>
      </div>

      <section className="section">
        <Reveal>
          <div className="subhead">Competition Results</div>
        </Reveal>
        {competitionGroups.map((g, gi) => (
          <Reveal key={gi} className="comp-group">
            <div className="comp-group__title">{g.title}</div>
            {g.note ? <div className="comp-group__note">{g.note}</div> : null}
            <ul className="comp-list">
              {g.items.map((it, i) => (
                <li key={i}>
                  <span className="c-name">{it.name}</span>
                  {it.year ? <span className="c-year">{it.year}</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <Reveal>
          <div className="subhead">Coursework</div>
          <ul className="pill-list">
            {coursework.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div className="subhead">AP Exam Scores</div>
          <div className="ap-grid">
            {apScores.map((a, i) => (
              <div className="ap" key={i}>
                <span className="ap-name">{a.exam}</span>
                <span className="ap-score">{a.score}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div className="subhead">Research</div>
          {research.map((r, i) => (
            <div className="card" key={i} style={{ borderLeftWidth: "3px" }}>
              <div className="card__body">
                <div className="card__title">{r.title}</div>
                <div className="card__meta">{r.mentor}</div>
                <p className="card__text">{r.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
