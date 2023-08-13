package com.hitachivantara.springdatajpa.service;

import com.hitachivantara.springdatajpa.Repository.NoteRepository;
import com.hitachivantara.springdatajpa.model.Notes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotesImpl implements NotesService{

    @Autowired
    private NoteRepository noteRepository;



    @Override
    public Notes saveNotes(Notes notes) {
        return noteRepository.save(notes);
    }

    @Override
    public List<Notes> getAllNotes() {
        return noteRepository.findAll();
    }

    @Override
    public void deleteNotes(Long id){
        noteRepository.deleteById(id);
    }

    @Override
    public Notes updateNotes(Long id, Notes updatedNote){
        Optional<Notes> optionalNote = noteRepository.findById(id);
        if(optionalNote.isPresent()){
            Notes existingNote = optionalNote.get();
            existingNote.setTitle(updatedNote.getTitle());
            existingNote.setContent(updatedNote.getContent());
            return noteRepository.save(existingNote);
        }
        return null;
    }
}
