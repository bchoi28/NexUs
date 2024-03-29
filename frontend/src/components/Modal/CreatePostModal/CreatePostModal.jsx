import './CreatePostModal.css'
import { useState, useRef, useEffect } from 'react';
import { createPost } from '../../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { getFileClickStatus, removeFileClick } from '../../../store/click';

const CreatePostModal = ({ handleClose, currentUser }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [body, setBody] = useState('')
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [fileClicked, setFileClicked] = useState(false);

    const fileClickStatus = useSelector(getFileClickStatus);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[body]', body);
        if (photoFile) {
            formData.append('post[photo]', photoFile);
        }

        dispatch(createPost(formData))
        handleClose();
    }

    const handleRemovePhoto = () => {
        setPhotoUrl(null);
        setPhotoFile(null);
    }

    let photoPreview = null;
    if (photoUrl) photoPreview = (
        <div className='update-photo-preview-container'>
            <img className='update-photo-preview' src={photoUrl} alt="preview" />
            <button className='update-photo-preview-close' onClick={handleRemovePhoto}>X</button>
        </div>
    )
    const authorPhoto = currentUser.photoUrl ? currentUser.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    useEffect(() => {
        if (fileClickStatus) {
            setFileClicked(true);
        }
    }, [fileClickStatus]);

    useEffect(() => {
        if (fileClicked && fileInputRef.current) {
            fileInputRef.current.click();
            setFileClicked(false);
            dispatch(removeFileClick());
        }
    }, [fileClicked]);

    return (

        <form className='post-modal-container' onSubmit={handleSubmit}>
            <header className='post-modal-header'>
                <img className='post-modal-user-pic' src={authorPhoto} alt="profile" />
                <div className='post-modal-name-headline' >
                    <div className='post-modal-user-name'>{currentUser.fName} {currentUser.lName} </div>
                    <div className='post-modal-user-headline'>{currentUser.headline}</div>
                </div>
                <div className='post-modal-close-container'>
                    <button className='post-modal-close' onClick={handleClose} >X</button>
                </div>
            </header>
            <div className='post-modal-body-container'>
                <textarea
                    className='post-modal-body-input'
                    onChange={handleBody}
                    placeholder='What do you want to talk about?'>
                </textarea>
                {photoPreview}
            </div>
            <div className='post-modal-footer'>
                <div className='post-modal-image-container' >
                    <label htmlFor="file-input" className="post-file-input-label">
                        <span className="post-file-input-icon">
                            <i className="fa-solid fa-image"></i>
                        </span>
                        Upload Image
                    </label>
                    <input
                        id="file-input"
                        className='post-modal-image-upload'
                        type="file"
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFile} />
                </div>
                <button className='post-modal-post-button'>Post</button>
            </div>
        </form>
    )
}

export default CreatePostModal;