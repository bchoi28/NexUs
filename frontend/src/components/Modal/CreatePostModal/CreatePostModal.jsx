import './CreatePostModal.css'
import { useState } from 'react';
import { createPost } from '../../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/user';

const CreatePostModal = ({ handleClose }) => {
    // handleClose = () => {setModalIsOpen(false)}
    // passed from ModalContainer->ModalSwitch->PostModal

    const dispatch = useDispatch();
    // const user = useSelector(getUser);
    // subscribes post modal to current user

    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState(null);
    const handleBody = (e) => {
        setBody(e.target.value)
    };
    const handleFile = (e) => {
        setImageUrl(e.target.files[0])
    };

    // creates a post
    const handleSubmit = (e) => {
        e.preventDefault();

        const post = {
            body: body,
            imageUrl: imageUrl
        };

        dispatch(createPost(post))
        handleClose();
    }

    return (

        <form className='post-modal-container' onSubmit={handleSubmit}>
            <header className='post-modal-header'>
                <img className='post-modal-user-pic' src="" alt="profile" />
                <div className='post-modal-user-name'>User Name</div>
                <button className='post-modal-close' onClick={handleClose} >x</button>
            </header>
            <div className='post-modal-body-container'>
                <textarea
                    className='post-modal-body-input'
                    onChange={handleBody}
                    placeholder='What do you want to talk about?'>
                </textarea>
            </div>
            <div className='post-modal-footer'>
                <div className='post-modal-image-container' >
                    <input
                        className='post-modal-image-input'
                        type="file"
                        accept='image/*'
                        onChange={handleFile} />
                </div>
                <button className='post-modal-post-button'>Post</button>
            </div>
        </form>
    )
}

export default CreatePostModal;