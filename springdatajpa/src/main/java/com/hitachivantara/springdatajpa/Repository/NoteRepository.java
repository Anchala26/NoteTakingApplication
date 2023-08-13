package com.hitachivantara.springdatajpa.Repository;

import com.hitachivantara.springdatajpa.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Notes, Long> {
}
