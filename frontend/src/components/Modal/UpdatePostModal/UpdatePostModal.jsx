import './UpdatePostModal.css';
import { useState } from 'react';
import { updatePost } from '../../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/user';

const UpdatePostModal = ({ handleClose, post }) => {
    // handleClose = () => {setModalIsOpen(false)}
    // passed from ModalContainer->ModalSwitch->PostModal
    // debugger
    const dispatch = useDispatch();
    // const user = useSelector(getUser);
    // subscribes post modal to current user

    const [body, setBody] = useState(post.body)
    const [file, setFile] = useState(post.file);
    const handleBody = (e) => {
        setBody(e.target.value)
    };
    const handleFile = (e) => {
        setFile(e.target.files[0])
    };

    // creates a post
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPost = {
            ...post, body, file
        };

        dispatch(updatePost(updatedPost))
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
                    value={body}
                    placeholder='What do you want to talk about?'>
                </textarea>
            </div>
            <div className='post-modal-footer'>
                <div className='post-modal-image-container' >
                    <input
                        className='post-modal-image-input'
                        type="file"
                        accept='image/*'
                        value={file}
                        onChange={handleFile} />
                </div>
                <button className='post-modal-update-button'>Update Post</button>
            </div>
        </form>
    )

};

export default UpdatePostModal;