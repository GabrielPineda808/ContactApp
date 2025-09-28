import { useEffect, useState } from 'react'
import { getContacts } from './services/contactsService'
import './App.css'

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

  useEffect(() => { getAllContacts();}, []); // runs once when componenet is reandered if there is no [] then it runs after every render and if there is an object inside the [] it wil run after first render and when that obj changes only

  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  )
}

export default App