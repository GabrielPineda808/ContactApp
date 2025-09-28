import { useEffect, useState } from 'react'
import Header from './components/Header'
import ContactList from './components/ContactList'
import { getContacts } from './api/ContactService'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

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

  const toggleModal = (show) => {}

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
    </>
  )
}

export default App