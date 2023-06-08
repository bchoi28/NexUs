import Modal from 'react-modal';
import './UpdateAboutModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modal';
import { useState } from 'react';
import { getUser, updateUser } from '../../../store/user';

const UpdateAboutModal = ({ about }) => {
    debugger
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);
    const [isOpen, setIsOpen] = useState(true);
    const [updatedAbout, setUpdatedAbout] = useState(about);
    const handleAbout = (e) => {
        setUpdatedAbout(e.target.value)
    }

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeModal())
        setIsOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            id: currentUser.id,
            about: updatedAbout
        }
        debugger
        dispatch(updateUser(user));
        dispatch(closeModal())
        setIsOpen(false);
    }

    return (

        <Modal
            className='modal-custom about-custom'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
        >
            <form className='update-about-container' onSubmit={handleSubmit}>
                <header className='update-about-header'>
                    <div className='update-about-title'>Edit about</div>
                    <div className='update-modal-close-container'>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                </header>
                <div className='about-subheading'>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</div>
                <textarea
                    className='update-about-input'
                    value={updatedAbout}
                    onChange={handleAbout}
                />
                <button
                    type='submit'
                    className='update-about-save-button'>Save
                </button>

            </form>

        </Modal>
    )
};

export default UpdateAboutModal;