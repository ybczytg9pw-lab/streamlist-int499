import { NavLink } from 'react-router';

const links = [
  { to: '/', label: 'StreamList', icon: 'playlist_play', end: true },
  { to: '/movies', label: 'Movies', icon: 'movie', end: false },
  { to: '/cart', label: 'Cart', icon: 'shopping_bag', end: false },
  { to: '/about', label: 'About', icon: 'info', end: false },
];

export default function Navigation() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="StreamList home">
        <span className="brand-mark" aria-hidden="true"><span className="material-symbols-rounded">play_arrow</span></span>
        <span>stream<span className="brand-accent">list</span><span className="brand-dot">.</span></span>
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
