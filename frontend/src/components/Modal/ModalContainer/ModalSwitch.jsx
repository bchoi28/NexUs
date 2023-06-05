import CreatePostModal from "../CreatePostModal";
import UpdatePostModal from "../UpdatePostModal";


// this component is merely responsible for rendering
// the specific modal for that container
const ModalSwitch = ({ modalType, handleClose, post }) => {
    switch (modalType) {
        case 'createPost':
            return <CreatePostModal handleClose={handleClose} />;
        case 'updatePost':
            return <UpdatePostModal handleClose={handleClose} post={post} />
        default:
            return null;
    }
}

export default ModalSwitch;