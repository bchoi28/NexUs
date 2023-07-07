import { useDispatch, useSelector } from 'react-redux';
import { getLikeStatus, getLikeId } from '../../store/post';
import { createLikePost, deleteLikePost } from '../../store/like';
import './Like.css';
import { getSessionUser } from '../../store/session';

const Like = ({ postId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    const currentUserId = currentUser.id;
    const likeId = parseInt(useSelector(getLikeId(postId, currentUserId)));
    const liked = useSelector(getLikeStatus(postId, currentUserId));

    const handleLike = () => {
        if (!liked) {
            dispatch(createLikePost(postId, currentUserId));
        } else {
            debugger
            dispatch(deleteLikePost(postId, likeId));
        }
    };

    return (
        <button className={liked ? `like-button like-button-active` : `like-button`} onClick={handleLike}>
            {liked ? (
                <>
                    <i className="liked-icon fa-solid fa-thumbs-up fa-flip-horizontal"></i>
                    <p className='liked-text'>Like</p>
                </>
            ) : (
                <>
                    <i class="unliked-icon fa-regular fa-thumbs-up fa-flip-horizontal"></i>
                    <p className='unliked-text'>Like</p>
                </>
            )
            }
        </button>
    );
};

export default Like;