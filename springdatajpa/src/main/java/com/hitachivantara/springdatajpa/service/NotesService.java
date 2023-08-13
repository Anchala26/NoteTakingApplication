package com.hitachivantara.springdatajpa.service;


import com.hitachivantara.springdatajpa.model.Notes;

import java.util.List;

public interface NotesService {
    Notes saveNotes(Notes notes);
    public List<Notes> getAllNotes();
    void deleteNotes(Long id);
    Notes updateNotes(Long id, Notes updatedNote);
}
