import React from 'react'
import Contact from './Contact'

const ContactList = ({data, currentPage, getAllContacts }) => { // takes in all data from backend aka the page we get from our backend of contact lists
  return (
    <main className='main'>
        { data?.content?.length === 0 && <div>No Contacts. Please add  a new contact.</div>} {/*if length of content is 0, display no contacts data and content may not be present*/}
        <ul className='contact__list'>
            {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id}/>)} {/*if length of content is greater than 0, map through each contact and display it*/}
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={()=> getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}> {/* go backwards on pagination, disable if on first page*/}
                    &laquo; {/*left double angle quote*/}
                </a>

                {[...Array(data.totalPages)].keys().map((page, index) =>
                     <a onClick={getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page} >{page + 1 }</a>)}

                <a onClick={()=> getAllContacts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}> {/* go forwards on pagination, disable if on last page */}
                    &raquo; {/*right double angle quote*/}
                </a>
            </div>}
    </main>
  )
}

export default ContactList
