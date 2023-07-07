import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Comment.css';
import { getSessionUser } from '../../store/session';
import { getCommentInformation } from '../../store/post';

const Comment = ({ postId }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const currentUser = useSelector(getSessionUser);
    const { comments, commenters } = useSelector(getCommentInformation(postId)) || {};
    const commentList = comments?.map(comment => {
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
            <div className='comment-item-container'>
                <img className='comment-form-user-photo' src={commenter.photoUrl} alt="commenter" />
                <div className='comment-item-info'>
                    <div className='comment-item-header'>
                        <div className='comment-names'> {commenter.fName} {commenter.lName} </div>
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
    const handleComment = (e) => {
        setComment(e.target.value);
    }
    return (
        <div className='post-footer-comment-container'>
            <div className='comment-form-container'>
                <img className='comment-form-user-photo' src={currentUser.photoUrl} alt="profile" />
                <input type="text" className='comment-create-form' onChange={handleComment} placeholder='Add a comment...' />
            </div>
            <div className='comment-list-container'>
                {commentList}
            </div>
        </div >
    )
}

export default Comment;