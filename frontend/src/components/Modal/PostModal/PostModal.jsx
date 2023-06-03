import './PostModal.css'
import { useState } from 'react';

const PostModal = ({ handleClose }) => {
    // handleClose = () => {setModalIsOpen(false)}
    // passed from ModalContainer->ModalSwitch->PostModal

    const [body, setBody] = useState('')
    const handleBody = (e) => {
        setBody(e.target.value)
    }

    const handleSubmit = (e) => {
        // make fetch post request
    }

    return (

        <form className='post-modal-container' onSubmit={handleSubmit}>
            <header className='post-modal-header'>
                <img className='post-modal-user-pic' src="" alt="profile" />
                <div className='post-modal-user-name'>User Name</div>
                <button className='post-modal-close' onClick={handleClose} >x</button>
            </header>
            <div className='post-modal-body-container'>
                <textarea className='post-modal-body-input' onChange={handleBody} placeholder='What do you want to talk about?'>
                </textarea>
            </div>
            <div className='post-modal-footer'>
                <div className='post-modal-image-container' >
                    <input className='post-modal-image-input' type="file" accept='image/*' />
                </div>
                <button className='post-modal-post-button'>Post</button>
            </div>
        </form>
    )
}

export default PostModal;