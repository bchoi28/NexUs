import './Comment.css'
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { deleteCommentPost, updateCommentPost } from '../../store/comment';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSessionUser } from '../../store/session';

const CommentItem = React.memo(({ comment, postId }) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [content, setContent] = useState(comment.content);

    const commentId = comment.id;
    const commenter = comment.commenter
    const currentUser = useSelector(getSessionUser)
    const isCurrentUserComment = currentUser && currentUser.id === comment.commenter.id;


    const createdDate = new Date(comment.createdAt);
    const updatedDate = new Date(comment.updatedAt);
    const currentDateTime = new Date();

    const wasEdited = updatedDate.getTime() - createdDate.getTime() > 5000; // 60,000 milliseconds = 1 minute
    const timeDifference = currentDateTime - createdDate;

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeAgo;
    if (hoursAgo > 0) timeAgo = `${hoursAgo}h`;
    else timeAgo = `${minutesAgo}m`;
    if (wasEdited) timeAgo = timeAgo + " \u00B7 Edited";


    const handleDeleteComment = (e) => {
        e.preventDefault();
        dispatch(deleteCommentPost(postId, commentId))
    }

    const handleSubmitUpdateForm = (e) => {
        e.preventDefault();

        const updatedComment = { content: content }
        dispatch(updateCommentPost(updatedComment, postId, commentId))

        setUpdateFormVisible(false);
    }

    const handleUpdateFormVisibility = () => {
        setUpdateFormVisible((prevUpdateFormVisibility) => !prevUpdateFormVisibility);
        setContent(comment.content);
    }

    const handleChangeUpdateContent = (e) => {
        const inputValue = e.target.value
        setContent(inputValue);
    }

    const toggleDropdown = () => {
        setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (updateFormVisible) {
            inputRef.current.focus();
        }
    }, [updateFormVisible]);

    return (
        <div className='comment-item-container' key={comment.id}>
            <img className='comment-form-user-photo' src={commenter.photoUrl ? commenter.photoUrl : '/assets/images/seeds/default-profile-image-circle.png'} alt="commenter" />
            <div className='comment-item-info'>
                <div className='comment-item-header'>
                    <NavLink to={`/profile/${commenter.id}`} className='comment-names'> {commenter.fName} {commenter.lName}</NavLink>
                    <div className='comment-pronouns'> {commenter.pronouns ? `(${commenter.pronouns})` : ''} </div>
                    <span className='comment-timestamp' >{timeAgo}</span>
                    {isCurrentUserComment && <div className='comment-edit-button' ref={dropdownRef} onClick={toggleDropdown}>...</div>
                    }
                    {dropdownOpen && (
                        <div className='comment-dropdown-menu'>
                            <div className='comment-dropdown-container'>
                                <div className='comment-dropdown-update' onClick={() => handleUpdateFormVisibility()}>
                                    <i className=" comment-update-button fa-solid fa-pencil"><span className='comment-update-text'>Edit</span></i>
                                </div>
                                <div onClick={handleDeleteComment} className='comment-dropdown-delete'>
                                    <i className=" comment-delete-button fa-regular fa-trash-can"><span className='comment-delete-text'>Delete</span></i>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='comment-headline'>
                    {commenter.headline}
                </div>
                {updateFormVisible ? (
                    <form className='comment-update-form' onSubmit={handleSubmitUpdateForm}>
                        <input ref={inputRef} className='comment-update-input' type='text' value={content} onChange={handleChangeUpdateContent} />
                        <div className='comment-update-buttons'>
                            <button className='comment-update-save' type='submit'>Save Changes</button>
                            <button className='comment-update-cancel' onClick={() => handleUpdateFormVisibility()} >Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className='comment-content'>{content}</div>
                )}
            </div>
        </div >
    )
})

export default CommentItem;
