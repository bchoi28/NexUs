import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeModal } from '../../../store/modal';
import { fetchLikersData, fetchUser } from '../../../store/user';
import './LikeCountModal.css';

const LikeCountModal = ({ likes, likeCount }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const [likersData, setLikersData] = useState([]);
    const likerIds = likes.map((like) => like.likerId);

    debugger
    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeModal());
        setIsOpen(false);
    }

    useEffect(() => {
        debugger
        const fetchData = async () => {
            const fetchPromises = likerIds.map(likerId => dispatch(fetchLikersData(likerId)));
            const likersData = await Promise.all(fetchPromises);
            setLikersData(likersData);
            debugger
        }
        fetchData();
    }, []);

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
                    <div className='like-count-container-modal'>
                        <i className="like-count-icon-modal fa-regular fa-thumbs-up fa-flip-horizontal"></i>
                        <p className='like-count-text-modal'>{likeCount}</p>
                    </div>
                </div>
                <div className='like-count-users'>
                    <div>user1</div>
                    <div>user2</div>
                    <div>user3</div>
                </div>
            </div>

        </Modal>
    )
}

export default LikeCountModal;