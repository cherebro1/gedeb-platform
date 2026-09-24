const services = [
  { name: 'Birth & death registration', office: 'Civil Registration Office' },
  { name: 'Business license application', office: 'Trade & Industry Office' },
  { name: 'Land use certificate', office: 'Land Administration Office' },
  { name: 'Kebele ID verification', office: 'Civil Registration Office' },
  { name: 'Tax payment receipts', office: 'Revenue Office' },
  { name: 'Building permit status', office: 'Construction & Urban Development' },
]

export default function EGovServices() {
  return (
    <section id="egov" className="egov">
      <div className="container">
        <p className="eyebrow-note">For residents</p>
        <h2>Services available online</h2>
        <p className="egov__lede">
          These woreda services can already be started or checked from your phone.
          More are added as offices complete digitization.
        </p>
        <ul className="egov__list">
          {services.map((s) => (
            <li key={s.name} className="egov__item">
              <span className="egov__name">{s.name}</span>
              <span className="egov__office">{s.office}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
