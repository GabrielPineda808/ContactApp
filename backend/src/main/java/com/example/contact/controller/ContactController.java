package com.example.contact.controller;

import com.example.contact.model.Contact;
import com.example.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.example.contact.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
@CrossOrigin
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact){
        return ResponseEntity.created(URI.create("/contacts/id")).body(contactService.createContact(contact));
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getContacts(@RequestParam(value="page", defaultValue="0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok().body(contactService.getAllContacts(page,size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContacts(@PathVariable(value="id") String id){
        return ResponseEntity.ok().body(contactService.getContact(id));
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id")String id, @RequestParam("file")MultipartFile file){
        return ResponseEntity.ok().body(contactService.uploadPhoto(id,file));
    }

    @GetMapping(value = "/image/{filename}", produces = {IMAGE_PNG_VALUE,IMAGE_JPEG_VALUE, IMAGE_GIF_VALUE})
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteContact(@RequestBody Contact contact) {
        contactService.deleteContact(contact);
        return ResponseEntity.noContent().build();
    }



}
