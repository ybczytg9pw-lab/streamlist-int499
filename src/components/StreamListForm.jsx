import { useState } from 'react';

export default function StreamListForm({ onSubmitTitle }) {
  const [title, setTitle] = useState('');
  const [confirmation, setConfirmation] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const submittedTitle = title.trim();
    if (!submittedTitle) {
      setConfirmation('Please enter a movie or show title first.');
      return;
    }

    onSubmitTitle(submittedTitle);
    setConfirmation(`“${submittedTitle}” was sent to the browser console.`);
    setTitle('');
  }

  return (
    <form className="title-form" onSubmit={handleSubmit}>
      <label htmlFor="watch-title" className="field-label">Movie or TV show title</label>
      <div className="field-row">
        <div className="input-wrap">
          <span className="material-symbols-rounded" aria-hidden="true">search</span>
          <input
            id="watch-title"
            type="text"
            value={title}
            maxLength={120}
            onChange={(event) => {
              setTitle(event.target.value);
              setConfirmation('');
            }}
            placeholder="e.g., The Pursuit of Happyness"
            autoComplete="off"
          />
        </div>
        <button className="submit-button" type="submit">
          <span>Add title</span>
          <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </button>
      </div>
      <p className="form-feedback" role="status" aria-live="polite">{confirmation || 'Enter a title and press Add title to see it in your developer console.'}</p>
    </form>
  );
}
