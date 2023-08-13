

import React, { useState } from 'react';
import axios from 'axios';
import './NoteForm.css';

function NoteForm({ handleCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newNote = {
      title,
      content,
      date,
    };

    axios.post('http://localhost:8090/api/notes/add', newNote)
      .then(response => {
        console.log(response.data);
        setTitle('');
        setContent('');
        setDate('');
        handleCancel();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="note-form">
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
