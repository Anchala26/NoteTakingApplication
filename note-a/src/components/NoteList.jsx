

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteList.css';

function NoteList({ searchTerm }) {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [updateNote, setUpdateNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get('http://localhost:8090/api/notes/getAll')
      .then(response => setNotes(response.data))
      .catch(error => console.log(error));
  };

  const deleteNote = id => {
    axios
      .delete(`http://localhost:8090/api/notes/delete/${id}`)
      .then(response => {
        console.log(response.data);
        fetchNotes();
      })
      .catch(error => console.log(error));
  };

  const handleUpdate = note => {
    setUpdateNote(note);
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
  };

  const handleCancelUpdate = () => {
    setUpdateNote(null);
    setUpdatedTitle('');
    setUpdatedContent('');
  };

  const handleSaveUpdate = () => {
    if (updateNote) {
      const updatedNote = {
        ...updateNote,
        title: updatedTitle,
        content: updatedContent
      };
      axios
        .put(`http://localhost:8090/api/notes/update/${updateNote.id}`, updatedNote)
        .then(response => {
          console.log(response.data);
          fetchNotes();
          setUpdateNote(null);
          setUpdatedTitle('');
          setUpdatedContent('');
        })
        .catch(error => console.log(error));
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === 'latest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const filteredNotes = sortedNotes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(note.date)
        .toLocaleDateString(undefined, { timeZone: 'UTC' })
        .includes(searchTerm)
  );

  const handleSortChange = e => {
    setSortOrder(e.target.value);
  };

  const handleTitleChange = e => {
    setUpdatedTitle(e.target.value);
  };

  const handleContentChange = e => {
    setUpdatedContent(e.target.value);
  };

  return (
    <div className="note-list">
      <h2>Notes</h2>
      <div className="sort-ing">
        Sort by:
        <select className="box" value={sortOrder} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {filteredNotes.length > 0 ? (
        <ul>
          {filteredNotes.map(note => (
            <li key={note.id}>
              <div className="button-container">
                {updateNote === note ? (
                  <>
                    <button className="save-b" onClick={handleSaveUpdate}>
                      Save
                    </button>
                    <button className="delete-b" onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="update-b" onClick={() => handleUpdate(note)}>
                    Update
                  </button>
                )}
                <button className="delete-b" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
              {updateNote === note ? (
                <>
                  <input className='update-text' type="text" value={updatedTitle} onChange={handleTitleChange} />
                  <input className='update-text'type="text" value={updatedContent} onChange={handleContentChange} />
                </>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </>
              )}
              <p className="date">Date: {new Date(note.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notes">No notes found.</p>
      )}
    </div>
  );
}

export default NoteList;
