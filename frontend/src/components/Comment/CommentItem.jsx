import './Comment.css'
import { useState, useRef, useEffect } from 'react';
import { deleteCommentPost, updateCommentPost } from '../../store/comment';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const CommentItem = ({ comment, postId }) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [openDropdownMap, setOpenDropdownMap] = useState({});
    const [content, setContent] = useState('');


    const commentId = comment.id;
    const commenter = comment.commenter
    let commentContent = comment.content;
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

    const handleDeleteComment = (e) => {
        e.preventDefault();
        dispatch(deleteCommentPost(postId, commentId))
    }

    const handleSubmitUpdateForm = (e) => {
        e.preventDefault();

        setContent('');
        setShowUpdateForm(false);
    }

    const handleOpenUpdateForm = (commentId, content) => {
        setContent(content);
        setShowUpdateForm(commentId);
    }

    const handleChangeUpdateContent = (e) => {
        const inputValue = e.target.value
        commentContent = inputValue;
    }

    const toggleDropdown = (commentId) => {
        setOpenDropdownMap((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const closeDropdown = (commentId) => {
        setOpenDropdownMap((prevState) => ({
            ...prevState,
            [commentId]: false,
        }));
    };

    const isDropdownOpen = openDropdownMap[commentId] || false;
    const isUpdateFormVisible = showUpdateForm === commentId;

    useEffect(() => {
        const handleClickOutside = (e) => {
            for (const commentId in openDropdownMap) {
                if (openDropdownMap[commentId] && !e.target.closest(`.comment-dropdown-${commentId}`)) {
                    closeDropdown(commentId);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdownMap]);

    useEffect(() => {
        if (showUpdateForm) {
            inputRef.current.focus();
        }
    }, [showUpdateForm]);

    return (
        <div className='comment-item-container' key={comment.id}>
            <img className='comment-form-user-photo' src={commenter.photoUrl} alt="commenter" />
            <div className='comment-item-info'>
                <div className='comment-item-header'>
                    <NavLink to={`/profile/${commenter.id}`} className='comment-names'> {commenter.fName} {commenter.lName}</NavLink>
                    <div className='comment-pronouns'> ({commenter.pronouns}) </div>
                    <span className='comment-timestamp' >{timeAgo}</span>
                    <div className='comment-edit-button' onClick={() => toggleDropdown(commentId)}>...</div>
                    {isDropdownOpen && (
                        <div className='comment-dropdown-menu'>
                            <div className='comment-dropdown-container'>
                                <div className='comment-dropdown-update' onClick={() => handleOpenUpdateForm(commentId, content)}>
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
                {isUpdateFormVisible ? (
                    <form className='comment-update-form' onSubmit={(e) => handleSubmitUpdateForm(commentId)}>
                        <input ref={inputRef} className='comment-update-input' type='text' value={commentContent} onChange={handleChangeUpdateContent} />
                        <div className='comment-update-buttons'>
                            <button className='comment-update-save' type='submit'>Save Changes</button>
                            <button className='comment-update-cancel' >Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className='comment-content'>{comment.content}</div>
                )}
            </div>
        </div >
    )
}

export default CommentItem;
