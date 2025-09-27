import axios from "axios";

const API_BASE_URL = "https://localhost:8080/contacts";

export async function saveContact(contact) { //function to save contact
    return await axios.post(API_BASE_URL, contact);
}

export async function getContacts(page=0, size=10) { //function to save contact
    return await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) { //function to get contact by id
    return await axios.get(`${API_BASE_URL}/${id}`);
}

export async function updateContact(contact) { //function to update contact by id
    return await axios.put(API_BASE_URL, contact);    
}

export async function updatePhoto(formData) { //function to update contact by id
    return await axios.put(`${API_BASE_URL}/photo`, formData);    
}

export async function deleteContact(contact) { //function to delete contact by id
    return await axios.delete(API_BASE_URL, contact);    
}