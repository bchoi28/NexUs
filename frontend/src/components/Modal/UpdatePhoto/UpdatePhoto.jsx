import './UpdatePhoto.css'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../../store/modal';
import { updateUserPhoto } from '../../../store/user';
import { getSessionUser } from '../../../store/session';
import { loading } from '../../../store/ui';


const UpdatePhoto = ({ profilePhoto }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)
    const userId = currentUser.id;
    const [isOpen, setIsOpen] = useState(true);

    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(profilePhoto);

    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        } else setPhotoUrl(null);
    };

    const handleRemovePhoto = () => {
        setPhotoUrl(null);
        setPhotoFile(null);
    }

    const handleClose = () => {
        dispatch(closeModal())
        setIsOpen(false);
        document.body.style.overflow = '';
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        const formData = new FormData();
        if (photoFile) {
            formData.append('user[photo]', photoFile);
            dispatch(updateUserPhoto(userId, formData));
        } else {
            formData.append('user[remove_photo]', 'true');
            dispatch(updateUserPhoto(userId, formData));
        }
        dispatch(loading())
        handleClose();
    }

    let photoPreview = null;
    if (photoUrl) {
        photoPreview = (
            <div className='update-cover-photo-preview-container'>
                <img className='update-profile-photo-preview' src={photoUrl} alt="" />
                <button className='update-profile-photo-preview-close' onClick={handleRemovePhoto}>X</button>
            </div>
        )
    }

    return (
        <Modal

            className='update-photo-custom'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
            onRequestClose={handleClose}
        >

            <form className='update-cover-photo-container' onSubmit={handleSubmit}>
                <header className='update-photo-header'>
                    <div className='update-about-title'>Add a profile picture</div>
                    <div className='update-modal-close-container'>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                </header>
                {photoPreview}
                <div className='upload-save-container' >
                    <div className='update-cover-photo-footer'>
                        <div className='update-modal-image-container' >
                            <label htmlFor="file-input" className="update-file-input-label">
                                <span className="update-file-input-icon">
                                    <i className="fa-solid fa-image"></i>
                                </span>
                                Upload photo
                            </label>
                            <input
                                id="file-input"
                                className='update-modal-image-upload'
                                type="file"
                                accept='image/*'
                                onChange={handleFile} />
                        </div>
                        <button
                            type='submit'
                            className='cover-photo-save-button'>Save
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default UpdatePhoto;