import { currentGroups, camps, previousGroups } from "../data/groups";
import OrgCard from "./helpers/OrgCard";
import Reveal from "./helpers/Reveal";

function CardList({ items }) {
  return (
    <div className="cards">
      {items.map((item, i) => (
        <Reveal key={i} delay={Math.min(i * 60, 240)}>
          <OrgCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

export default function Groups() {
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">groups</div>
        <h1>Groups &amp; Community</h1>
        <p>
          Organizations I help run, camps and programs I've attended, and where
          I've volunteered.
        </p>
      </div>

      <section className="section">
        <Reveal>
          <div className="subhead">Current Involvement</div>
        </Reveal>
        <CardList items={currentGroups} />
      </section>

      <section className="section">
        <Reveal>
          <div className="subhead">Camps &amp; Programs</div>
        </Reveal>
        <CardList items={camps} />
      </section>

      <section className="section">
        <Reveal>
          <div className="subhead">Previous Organizations</div>
        </Reveal>
        <CardList items={previousGroups} />
      </section>
    </div>
  );
}
