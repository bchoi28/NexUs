import Modal from "react-modal";
import './ModalContainer.css';

// this component is what we render in our specific
// form container (post-container, )
const ModalContainer = ({ isOpen, onRequestClose, children, isPost }) => {
    return (
        <Modal
            isOpen={isOpen}
            // isOpen = modalIsOpen
            onRequestClose={onRequestClose}
            // onRequestClose = setModalIsOpen(false)
            className={isPost ? 'post-modal-custom' : 'modal-custom'}
            overlayClassName='modal-overlay'
        >
            {children}
            {/* this is the ModalSwitch with specific modalType prop */}
        </Modal>
    );
}

export default ModalContainer;