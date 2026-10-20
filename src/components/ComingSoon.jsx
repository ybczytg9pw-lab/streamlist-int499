export default function ComingSoon({ title, icon, week }) {
  return (
    <section className="placeholder-page" aria-labelledby="page-title">
      <div className="placeholder-icon"><span className="material-symbols-rounded" aria-hidden="true">{icon}</span></div>
      <span className="section-kicker">STREAMLIST / {title.toUpperCase()}</span>
      <h1 id="page-title">{title}</h1>
      <p>This page is part of the navigation structure. Its content and features will be developed in Week {week}.</p>
      <span className="coming-badge"><span className="material-symbols-rounded" aria-hidden="true">schedule</span> Planned for Week {week}</span>
    </section>
  );
}
