import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';

const ContactDetail = ({updateContact, updateImage}) => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: '',
      });

      const { id } = useParams(); // get the id from the url

      const fetchContact = async (id) => {
          try {
            const {data} = await getContact(id); // save contact without photo first to get the id and get just data from response
            setContact(data); // set contact state
            console.log(data);
          }catch (error) {
            console.error('Error fetching contact:', error);
          }
        }

        useEffect(() => { fetchContact(id);}, []);

  return (
    <div>
      
    </div>
  )
}

export default ContactDetail
