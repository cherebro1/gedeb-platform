export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__row">
        <div className="hero__copy">
          <p className="eyebrow-note">Gedeb Woreda · Gedeo Zone, Ethiopia</p>
          <h1>
            A woreda grown from coffee soil,
            <br />now building its digital ground.
          </h1>
          <p className="hero__lede">
            Gedeb is known across Ethiopia for the coffee grown on its hillsides.
            The Innovation &amp; Technology Office is planting something new alongside it:
            government services citizens can reach online, and a place for local
            entrepreneurs to build tech ventures.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#digitize">Request a digital service</a>
            <a className="btn btn--outline" href="#startups">Register a startup</a>
          </div>
        </div>
        <div className="hero__mark" aria-hidden="true">
          <svg viewBox="0 0 320 320" width="100%" role="presentation">
            <circle cx="160" cy="160" r="150" fill="none" stroke="#c89b3c" strokeWidth="1" opacity="0.5" />
            <g transform="translate(160,160)">
              <ellipse rx="78" ry="108" fill="#4a3020" />
              <path d="M0,-108 C10,-40 10,40 0,108 C-10,40 -10,-40 0,-108 Z" fill="#2a1b12" />
              <ellipse rx="78" ry="108" fill="none" stroke="#e0bf78" strokeWidth="1.5" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
