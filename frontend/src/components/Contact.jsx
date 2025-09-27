import React from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ contact }) => { //takes in contact prop
  return (
    <Link to={`/contacts/${contact.id}`} className='contact__item'> //routes to contact id card page in future
        <div className='contact__header'>
            <div className='contact__image'>
                <img src={contact.photoUrl} alt={contact.name}></img>
            </div>
            <div className='contact__details'>
                <p className='contact_name'>{contact.name.substring(0,15)} </p>
                <p className='contact_title'>{contact.title}</p>
            </div>
        </div>
        <div className='contact__body'>
            <p><i className='bi bi-envelope'></i> {contact.emai.substring(0,20)}</p>
            <p><i className='bi bi-geo'></i> {contact.address}</p>
            <p><i className='bi bi-telephone'></i> {contact.phone}</p>
            <p>{contact.status==='Active' ? <i className='bi bi-check-circle'></i> : 
            <i className='bi bi-x-circle'></i>} {contact.status}</p> //if statement to pass in icon on contact prop status
        </div>
    </Link>
  )
}

export default Contact
