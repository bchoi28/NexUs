import './PostForm.css';
import { useState } from 'react';
import Modal from 'react-modal';


const PostForm = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const [isDivEmpty, setIsDivEmpty] = useState(true);



    return (
        <div className='create-post-form'>
            <div className='create-post-form-top'>
                <img src="" alt="profile picture" />
                <button className='create-post-button' onClick={handleOpenModal}>Start a post</button>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel='Create Post Modal'
                    className='post-modal-custom'
                    overlayClassName='post-modal-overlay'
                >
                    <div className='post-modal-container'>
                        <header className='post-modal-header'>
                            <img className='post-modal-user-pic' src="" alt="profile" />
                            <div className='post-modal-user-name'>User Name</div>
                            <svg onClick={handleCloseModal} className='post-modal-close' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                            </svg>
                        </header>
                        <div
                            contentEditable="true"
                            role="textbox"
                            onInput={e => setIsDivEmpty(e.currentTarget.textContent === '')}
                        >
                        </div>
                        <button>Post</button>
                    </div>
                </Modal>

            </div>
            <div className='create-post-form-bottom'>

            </div>
        </div>
    )
}

export default PostForm;