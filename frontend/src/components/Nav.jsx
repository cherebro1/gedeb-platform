export default function Nav() {
  const links = [
    ['Innovation Office', '#office'],
    ['Digitize a service', '#digitize'],
    ['E-government', '#egov'],
    ['Startups', '#startups'],
  ]
  return (
    <header className="nav">
      <div className="container nav__row">
        <a href="#top" className="nav__brand">
          <span className="nav__mark" aria-hidden="true">☕</span>
          Gedeb Woreda
        </a>
        <nav className="nav__links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
