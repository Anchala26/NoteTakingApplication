import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddNote = () => {
    setAddingNote(true);
  };

  const handleCancelAddNote = () => {
    setAddingNote(false);
  };

  return (
    <div className="note-app">
      <h1>Note Taking App</h1>
      <div className="actions">
        <div className="search-bar">
          <input className='search-bar-in'
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {!addingNote ? (
          <button className="add-button" onClick={handleAddNote}>
            Add Note
          </button>
        ) : (
          <button className="cancel-button" onClick={handleCancelAddNote}>
            Cancel
          </button>
        )}
      </div>
      {addingNote ? <NoteForm handleCancel={handleCancelAddNote} /> : null}
      <NoteList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
