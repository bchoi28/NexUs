import { useDispatch, useSelector } from 'react-redux';
import { createLike, createLikeFetch, deleteLike, deleteLikeFetch, getLikeId, getLikeStatus } from '../../store/like';
import './Like.css';

const Like = ({ postId }) => {
    const dispatch = useDispatch();
    const liked = useSelector(getLikeStatus(postId));
    const likeId = useSelector(getLikeId(postId));
    const handleLike = () => {
        if (!liked) {
            dispatch(createLikeFetch(postId));
        } else {
            dispatch(deleteLikeFetch(postId, likeId));
        }
    };

    return (
        <button className='like-button' onClick={handleLike}>
            {liked ? <i className="liked-icon fa-solid fa-heart"></i> : <i className="unliked-icon fa-regular fa-heart"></i>}
        </button>
    );
};

export default Like;