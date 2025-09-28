import { useEffect, useState, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import ContactList from './components/ContactList'
import { getContacts, saveContact, updatePhoto, deleteContact } from './api/ContactService'
import { Routes, Route, Navigate } from 'react-router-dom'
import ContactDetail from './components/ContactDetail'
import { ToastContainer } from 'react-toastify'

function App() {
  const modalRef = useRef(); // reference to the modal element in the DOM aka document.getElementById hold of native html element
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  });

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const {data} = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value}) // spread operator to copy existing values and update the specific field
  } // updates state on input change

  const handleNewContact = async (e) => {
    e.preventDefault(); // prevent form from submitting and reloading the page
    try {
      const {data} = await saveContact(values); // save contact without photo first to get the id and get just data from response
      const formData = new FormData(); // create a new FormData object to hold the file data
      formData.append('file', file, file.name); // append the file to the FormData object with key 'file'
      formData.append('id', data.id); // append the contact id to the FormData object with key 'id'
      const {data: photoUrl} = await updatePhoto(formData); // send the FormData object to the server
      toggleModal(false); // close the modal
      setFile(undefined); // reset file state
      fileRef.current.value = null; // reset file input value
      setValues({ // reset form values
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      });
      modalRef.current.close(); // close the modal
      getAllContacts();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  }

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const {data : photoUrl} = await updatePhoto(formData);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  }

  const deleteContactFromList = async (contactToDelete) => {
    try {
      await deleteContact(contactToDelete);
      // Remove the contact from local state
      setData(prev => ({
        ...prev,
        content: prev.content.filter(c => c.id !== contactToDelete.id),
        totalElements: prev.totalElements - 1
      }));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };


  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close(); // toggle modal natively with html of ref 

  useEffect(() => { getAllContacts();}, []); // runs once when componenet is reandered if there is no [] then it runs after every render and if there is an object inside the [] it wil run after first render and when that obj changes only

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements}/>
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate  to='/contacts'/>}></Route>
            <Route path='/contacts' element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />}/>
            <Route path='/contacts/:id' element={<ContactDetail updateContact={updateContact} updateImage={updateImage} onDelete={deleteContactFromList} />}/>
          </Routes>
        </div>
      </main>

       {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact} >
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required /> {/* onChange to update state on input change */}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required /> {/* value is from state values */}
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button type='button' onClick={() => toggleModal(false)} className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  )
}

export default App