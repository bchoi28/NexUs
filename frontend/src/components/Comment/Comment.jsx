import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Comment.css';
import { getSessionUser } from '../../store/session';
import { getCommentInformation } from '../../store/post';
import { NavLink } from 'react-router-dom';
import { createCommentPost } from '../../store/comment';

const Comment = ({ postId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [showButton, setShowButton] = useState(false)

    const currentUser = useSelector(getSessionUser);
    const currentUserId = currentUser.id
    const { comments } = useSelector(getCommentInformation(postId)) || {};
    const commentList = comments?.map(comment => {
        debugger
        const commenter = comment.commenter
        const createdDate = new Date(comment.createdAt);
        const updatedDate = new Date(comment.updatedAt);
        const currentDateTime = new Date();

        const wasEdited = updatedDate.getTime() - createdDate.getTime() > 5000; // 60,000 milliseconds = 1 minute
        const timeDifference = currentDateTime - createdDate;

        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        let timeAgo;
        if (hoursAgo > 0) {
            timeAgo = `${hoursAgo}h`;
        } else {
            timeAgo = `${minutesAgo}m`;
        }

        if (wasEdited) {
            timeAgo = timeAgo + " \u00B7 Edited";
        }

        return (
            <div className='comment-item-container' key={comment.id}>
                <img className='comment-form-user-photo' src={commenter.photoUrl} alt="commenter" />
                <div className='comment-item-info'>
                    <div className='comment-item-header'>
                        <NavLink to={`/profile/${commenter.id}`} className='comment-names'> {commenter.fName} {commenter.lName}</NavLink>
                        <div className='comment-pronouns'> ({commenter.pronouns}) </div>
                        <span className='comment-timestamp' >{timeAgo}</span>
                        <div className='comment-edit-button'>...</div>
                    </div>
                    <div className='comment-headline'>
                        {commenter.headline}
                    </div>
                    <div className='comment-content'>
                        {comment.content}
                    </div>
                </div>
            </div>
        )
    })
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
    }

    return (
        <div className='post-footer-comment-container'>
            <div className='comment-form-container'>
                <img className='comment-form-user-photo' src={currentUser.photoUrl} alt="profile" />
                <input type="text" className='comment-create-form' onChange={handleChangeContent} placeholder='Add a comment...' />
                {showButton && <button className='comment-post-button' onClick={handlePostComment}>Post</button>}
            </div>
            <div className='comment-list-container'>
                {commentList}
            </div>
        </div >
    )
}

export default Comment;