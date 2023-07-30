import './UpdatePostModal.css';
import { useState } from 'react';
import { updatePost } from '../../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/user';

const UpdatePostModal = ({ handleClose, post, currentUser }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState(post.body)
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(post.photoUrl);

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
        const id = post.id;
        if (photoFile) {
            formData.append('post[photo]', photoFile);
            dispatch(updatePost(id, formData))
        } else {
            dispatch(updatePost(id, formData, !photoFile))
        }
        handleClose();
    }

    const handleRemovePhoto = () => {
        setPhotoUrl(null);
        setPhotoFile(null);
    }

    let photoPreview = null;
    if (photoUrl) {
        photoPreview = (
            <div className='update-photo-preview-container'>
                <img className='update-photo-preview' src={photoUrl} alt="" />
                <button className='update-photo-preview-close' onClick={handleRemovePhoto}>X</button>
            </div>
        )
    }
    const authorPhoto = currentUser.photoUrl ? currentUser.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    return (

        <form className='update-modal-container' onSubmit={handleSubmit}>
            <header className='update-modal-header'>
                <img className='update-modal-user-pic' src={authorPhoto} alt="profile" />
                <div className='post-modal-name-headline' >
                    <div className='update-modal-user-name'>{currentUser.fName} {currentUser.lName} </div>
                    <div className='update-modal-user-headline'>{currentUser.headline}</div>
                </div>
                <div className='update-modal-close-container'>
                    <button className='update-modal-close' onClick={handleClose} >X</button>
                </div>
            </header>
            <div className='post-modal-body-container'>
                <textarea
                    className='update-modal-body-input'
                    onChange={handleBody}
                    value={body}
                    placeholder='What do you want to talk about?' />
                {photoPreview}
            </div>
            <div className='update-modal-footer'>
                <div className='update-modal-image-container' >
                    <label htmlFor="file-input" className="update-file-input-label">
                        <span className="update-file-input-icon">
                            <i className="fa-solid fa-image"></i>
                        </span>
                        Upload Image
                    </label>
                    <input
                        id="file-input"
                        className='update-modal-image-upload'
                        type="file"
                        accept='image/*'
                        onChange={handleFile} />
                </div>
                <button className='post-modal-post-button update-modal-update-button'>Edit Post</button>
            </div>
        </form>
    )

};

export default UpdatePostModal;