import Modal from "react-modal";
import './ModalContainer.css';

const ModalContainer = ({ isOpen, onRequestClose, children, isPost }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={isPost ? 'post-modal-custom' : 'modal-custom'}
            overlayClassName='modal-overlay'
        >
            {children}
        </Modal>
    );
}

export default ModalContainer;