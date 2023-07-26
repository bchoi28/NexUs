import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Comment.css';
import { getSessionUser } from '../../store/session';
import { getCommentInformation } from '../../store/post';
import { createCommentPost } from '../../store/comment';
import CommentItem from './CommentItem';

const Comment = ({ postId }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [showButton, setShowButton] = useState(false);

    const currentUser = useSelector(getSessionUser);
    const { comments } = useSelector(getCommentInformation(postId)) || {};
    const orderedComments = comments ? [...comments].sort((a, b) => new Date(b.updatedAt) > new Date(a.updatedAt) ? 1 : -1) : [];

    const commentList = orderedComments?.map(comment => {
        return <CommentItem key={comment.id} comment={comment} postId={postId} />
    });

    const handleChangeContent = (e) => {
        const inputValue = e.target.value
        setContent(inputValue);
        setShowButton(inputValue.length > 0);
    }

    const handlePostComment = (e) => {
        e.preventDefault();
        const comment = { content: content }
        dispatch(createCommentPost(comment, postId));
        setContent('');
        setShowButton(false);
        document.getElementById('comment-input').value = '';
    }

    const currentUserPhoto = currentUser.photoUrl ? currentUser.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    return (
        <div className='post-footer-comment-container'>
            <div className='comment-form-container'>
                <img className='comment-form-user-photo' src={currentUserPhoto} alt="profile" />
                <input id='comment-input' type="text" className='comment-create-form' onChange={handleChangeContent} placeholder='Add a comment...' />
                {showButton && <button className='comment-post-button' onClick={handlePostComment}>Post</button>}
            </div>
            <div className='comment-list-container'>
                {commentList}
            </div>
        </div >
    )
}

export default Comment;