import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../../store/modal';
import './LikeCountModal.css';

const LikeCountModal = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeModal());
        setIsOpen(false);
    }

    return (
        <Modal
            className='modal-custom'
            overlayClassName='modal-overlay-like-count'
            isOpen={isOpen}
        >
            <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
            <div>user1</div>
            <div>user2</div>
            <div>user3</div>
        </Modal>
    )
}

export default LikeCountModal;