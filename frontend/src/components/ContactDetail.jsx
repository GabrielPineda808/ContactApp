import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getContact, deleteContact } from '../api/ContactService';
import { toastError, toastSuccess } from '../api/ToastService';

const ContactDetail = ({ updateContact, updateImage, onDelete }) => {
    const inputRef = useRef();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setContact(data);
            console.log(data);
            //toastSuccess('Contact retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };


    const selectImage = () => {
        inputRef.current.click();
    };

    const udpatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            toastSuccess('Photo updated');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const onUpdateContact = async (event) => {
        event.preventDefault();
        await updateContact(contact);        
        fetchContact(id);
        toastSuccess('Contact Updated');
    };

    useEffect(() => {
        fetchContact(id);
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{contact.name}</p>
                        <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateContact} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={contact.id} name="id" required />
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
                            <div className="form_footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                                    Delete
                                </button>
                                <button type="submit" className="btn">Save</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>

            {showDeleteModal && (
                <dialog open className="modal" id="deleteModal">
                    <div className="modal__header">
                    <h3>Confirm Delete</h3>
                    <i className="bi bi-x-lg" onClick={() => setShowDeleteModal(false)}></i>
                    </div>
                    <div className="divider"></div>
                    <div className="modal__body">
                    <p>Are you sure you want to delete {contact.name}?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-danger" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={async () => {
                        await onDelete(contact);
                        toastSuccess('Contact deleted');
                        navigate('/contacts');
                        }}>Yes, Delete</button>
                    </div>
                    </div>
                </dialog>
            )}
        </>
    )
}

export default ContactDetail;