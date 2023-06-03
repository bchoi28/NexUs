import PostModal from "../PostModal";


// this component is merely responsible for rendering
// the specific modal for that container
const ModalSwitch = ({ modalType, handleClose }) => {
    switch (modalType) {
        case 'post':
            return <PostModal handleClose={handleClose} />;
        // Other cases go here as we add more modal types
        default:
            return null;
    }
}

export default ModalSwitch;