import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import ContactList from './components/ContactList'
import { getContacts } from './api/ContactService'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const modalRef = useRef(); // reference to the modal element in the DOM aka document.getElementById hold of native html element
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
          <form>
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
                <input type="file" onChange={(e) => setFile(e.target.files[0])} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default App