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
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    const handleBody = (e) => {
        setBody(e.target.value)
    };
    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        } else setPhotoUrl(null);
    };

    // creates a post
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[body]', body);
        if (photoFile) {
            formData.append('post[photo]', photoFile);
        }

        dispatch(createPost(formData))
        // dispatch(createPost('body': body, 'photo': photoFile))
        handleClose();
    }

    let preview = null;
    if (photoUrl) preview = <img src={photoUrl} alt="" />;

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
                <div>
                    {preview}
                </div>
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