import CreatePostModal from "../CreatePostModal";
import UpdatePostModal from "../UpdatePostModal";

const ModalSwitch = ({ modalType, handleClose, post, currentUser }) => {
    switch (modalType) {
        case 'createPost':
            return <CreatePostModal handleClose={handleClose} currentUser={currentUser} isPost={true} />;
        case 'updatePost':
            return <UpdatePostModal handleClose={handleClose} post={post} currentUser={currentUser} />
        default:
            return null;
    }
}

export default ModalSwitch;