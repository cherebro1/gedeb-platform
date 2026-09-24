const pillars = [
  {
    title: 'Digitize a government service',
    body: 'Any woreda office can request that a paper-based service — permits, ID processes, land records, civil registration — be moved online, with our team.',
  },
  {
    title: 'Public e-government access',
    body: 'Citizens reach woreda services from a phone or a shared computer, without a repeat trip to an office window.',
  },
  {
    title: 'Startup guidance',
    body: 'New and early tech founders get a clear path to register their business and connect with the office for support.',
  },
  {
    title: 'AI assistant',
    body: 'A chat assistant answers common questions about services, registration steps, and office hours at any time.',
  },
]

export default function InnovationOffice() {
  return (
    <section id="office" className="office">
      <div className="container">
        <p className="eyebrow-note">The office</p>
        <h2>Gedeb Innovation &amp; Technology Office</h2>
        <p className="office__lede">
          We run the woreda's Digital Transformation Platform — the bridge between
          Gedeb's government offices, its residents, and the small but growing group
          of local tech builders.
        </p>
        <div className="office__grid">
          {pillars.map((p) => (
            <div className="office__card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
