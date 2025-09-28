import React, {useState, useEffect, useRef} from 'react'
import { Link, useParams } from 'react-router-dom';
import { getContact} from '../api/ContactService';

const ContactDetail = ({updateContact, updateImage}) => {

    const inputRef = useRef();
    const [contact, setContact] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: ''
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
            await updateImage(formData); // send the FormData object to the server
            setContact((prev) => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`})); // update contact state with new photoUrl
        }
        catch (error) {
            console.error('Error updating photo:', error);
        };
    }

    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value }); // spread operator to copy existing values and update the specific field aka set input values as current contact you are editing
    };

    const onUpdateContact = async (event) => {
        event.preventDefault(); // prevent form from submitting and reloading the page
        await updateContact(contact);// call updateContact function from props   
        fetchContact(id); // refresh contact details
    };

    useEffect(() => {
        fetchContact(id); // fetch contact details when component mounts or id changes
    }, []);

    
    const selectImage = () => {
        inputRef.current.click(); // programmatically click the hidden file input
    }

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
        <div className='profile__settings'>
            <div>
                 <form onSubmit={onUpdateContact} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={contact.id} name="id" required /> {/* hidden input to hold contact id */}
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={contact.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={contact.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone</span>
                                    <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" value={contact.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={contact.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={contact.status} onChange={onChange} name="status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
            </div>
        </div>
    </div>

    <form style={{display: 'none'}}>
        <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accepts='iamge/*'></input>
    </form>
    </>
    )
}

export default ContactDetail
