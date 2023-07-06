import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeModal } from '../../../store/modal';
import { fetchLikersData, fetchUser } from '../../../store/user';
import './LikeCountModal.css';
import { useHistory } from 'react-router-dom';

const LikeCountModal = ({ likers, likeCount }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        dispatch(closeModal());
        setIsOpen(false);
        document.body.style.overflow = '';
    }

    const handleLinkProfile = (likerId) => {
        history.push(`/profile/${likerId}`);
        handleClose();
    }

    const likersList = likers.map(liker => {
        return (
            <div className='liker-item-container' key={liker.id} onClick={() => handleLinkProfile(liker.id)}>
                <img className='liker-item-photo' src={liker.photoUrl} alt='liker' />
                <div className='liker-item-info'>
                    <div className='liker-item-names'>{liker.fName} {liker.lName}</div>
                    <div className='liker-item-headline'>{liker.headline}</div>
                </div>
            </div>
        )
    })

    return (
        <Modal
            className='modal-custom'
            overlayClassName='modal-overlay-like-count'
            isOpen={isOpen}
        >
            <div className='like-count-modal-container'>
                <div className='like-header-count'>
                    <div className='like-count-modal-header'>
                        <div className='like-count-modal-header-text' >Reactions</div>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                    <div className='like-count-icon-text'>
                        <i className="like-count-icon-modal fa-regular fa-thumbs-up fa-flip-horizontal"></i>
                        <p className='like-count-text-modal'>{likeCount}</p>
                    </div>
                </div>
                {likersList}
            </div>

        </Modal>
    )
}

export default LikeCountModal;