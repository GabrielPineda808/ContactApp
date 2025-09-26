import React from 'react'

const Header = ({toggleModal, nbOfContacts}) => { //passing props from App.jsx function for header we will put in app.jsx
  return (
    <header className='header'> // header component with bootstrap
        <div className="container">
            <h3>Contact List ({nbOfContacts})</h3> //nbOfContacts is a prop
            <button onClick={()=> toggleModal(true)} className='btn'>
              <i className='bi bi-plus-square'></i> Add New Contact
            </button>
        </div>
    </header>
  )
}

export default Header
