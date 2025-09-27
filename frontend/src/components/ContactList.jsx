import React from 'react'
import Contact from './Contact'

const ContactList = ({data, currentPage, getAllContacts }) => { // takes in all data from backend aka the page we get from our backend of contact lists
  return (
    <main className='main'>
        { data?.content?.length === 0 && <div>No Contacts. Please add  a new contact.</div>} //if length of content is 0, display no contacts data and content may not be present
        <ul className='contact__list'>
            {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id}/>)} //if length of content is greater than 0, map through each contact and display it
        </ul>
    </main>
  )
}

export default ContactList
