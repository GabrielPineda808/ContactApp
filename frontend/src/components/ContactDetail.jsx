import React, {useState, useEffect, useRef} from 'react'
import { Link, useParams } from 'react-router-dom';
import { getContact, updatePhoto } from '../api/ContactService';

const ContactDetail = ({updateContact, updateImage}) => {

    const inputRef = useRef();
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

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData(); // create a new FormData object to hold the file data
            formData.append('file', file, file.name); // append the file to the FormData object with key 'file'
            formData.append('id', id); // append the contact id to the FormData object with key 'id'
            const {data } = await updateImage(id);
            setContact(data);
            console.log(data);
        }
        catch (error) {
            console.error('Error updating photo:', error);
        };
    }

    
    const selectImage = () => {}

    useEffect(() => { fetchContact(id);}, []);

    return (
    <>
    <Link to={'/contacts'} className="link"><i className='bi bi-arrow-left'></i>Back to Contact Page</Link>
    <div className='profile'>
        <div className='profile__details'>
            <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
            <div className='profile__metadata'>
                <p className='profile__name'>{contact.name}</p>
                <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MB</p>
                <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i>Change Photo</button>
            </div>
        </div>
        <div className='profile__settings'>Settings</div>
    </div>

    <form style={{display: 'none'}}>
        <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accepts='iamge/*'></input>
    </form>
    </>
    )
}

export default ContactDetail
