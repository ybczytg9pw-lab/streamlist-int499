import StreamListForm from '../components/StreamListForm.jsx';

export default function StreamListPage() {
  function handleTitleSubmit(title) {
    // Week 1 requirement: log the submitted user input, without saving it yet.
    console.log('StreamList input:', title);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-pulse" /> YOUR WATCHLIST STARTS HERE</span>
          <h1>Good stories deserve <span>a place on your list.</span></h1>
          <p className="hero-description">Never lose track of that movie or show you’ve been meaning to watch. StreamList keeps the idea simple, all in one place.</p>
          <div className="hero-note"><span className="material-symbols-rounded" aria-hidden="true">auto_awesome</span> Built for your next movie night</div>
        </div>
        <div className="art-panel" aria-hidden="true">
          <div className="art-halo" />
          <div className="art-card art-card-back"><span className="material-symbols-rounded">local_movies</span><div className="art-skeleton narrow"/><div className="art-skeleton"/></div>
          <div className="art-card art-card-front"><div className="art-card-symbol"><span className="material-symbols-rounded">playlist_add_check</span></div><div className="art-skeleton narrow"/><div className="art-skeleton"/><div className="art-skeleton short"/><div className="art-check"><span className="material-symbols-rounded">check</span></div></div>
          <div className="art-spark art-spark-one">✦</div><div className="art-spark art-spark-two">✦</div>
        </div>
      </section>

      <section className="entry-panel" aria-labelledby="entry-heading">
        <div className="panel-heading"><div><span className="section-kicker">THE FIRST STEP</span><h2 id="entry-heading">What's on your watchlist?</h2></div><span className="week-badge">WEEK 01</span></div>
        <p className="entry-description">Start by typing a title below. For this first version, we'll capture your entry in the browser console.</p>
        <StreamListForm onSubmitTitle={handleTitleSubmit} />
      </section>

      <div className="info-strip"><span className="material-symbols-rounded" aria-hidden="true">lightbulb</span><p><strong>Developer tip:</strong> Press <kbd>F12</kbd> and select <strong>Console</strong> before submitting a title to view the result.</p></div>
    </>
  );
}
