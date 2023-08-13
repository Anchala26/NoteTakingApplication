package com.hitachivantara.springdatajpa.Controller;

import com.hitachivantara.springdatajpa.model.Notes;
import com.hitachivantara.springdatajpa.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {
    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public Notes add(@RequestBody Notes notes){

        return notesService.saveNotes(notes);

    }

    @GetMapping("/getAll")
    public List<Notes> getAllNotes(){
        return notesService.getAllNotes();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        notesService.deleteNotes(id);
    }

    @PutMapping("/update/{id}")
    public Notes update(@PathVariable("id") Long id, @RequestBody Notes updatedNote){
        return notesService.updateNotes(id, updatedNote);
    }
}