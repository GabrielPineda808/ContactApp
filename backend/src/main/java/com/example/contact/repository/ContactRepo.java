package com.example.contact.repository;

import com.example.contact.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {
    Optional<Contact> findById(String id);
}
