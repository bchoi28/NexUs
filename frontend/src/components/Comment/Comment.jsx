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

    return (
        <div className='post-footer-comment-container'>
            <div className='comment-form-container'>
                <img className='comment-form-user-photo' src={currentUser.photoUrl} alt="profile" />
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

        // return (
        //     <div className='comment-item-container' key={comment.id}>
        //         <img className='comment-form-user-photo' src={commenter.photoUrl} alt="commenter" />
        //         <div className='comment-item-info'>
        //             <div className='comment-item-header'>
        //                 <NavLink to={`/profile/${commenter.id}`} className='comment-names'> {commenter.fName} {commenter.lName}</NavLink>
        //                 <div className='comment-pronouns'> ({commenter.pronouns}) </div>
        //                 <span className='comment-timestamp' >{timeAgo}</span>
        //                 <div className='comment-edit-button' onClick={() => toggleDropdown(commentId)}>...</div>
        //                 {isDropdownOpen && (
        //                     <div className='comment-dropdown-menu'>
        //                         <div className='comment-dropdown-container'>
        //                             <div className='comment-dropdown-update' onClick={() => handleOpenUpdateForm(commentId, content)}>
        //                                 <i className=" comment-update-button fa-solid fa-pencil"><span className='comment-update-text'>Edit</span></i>
        //                             </div>
        //                             <div onClick={handleDeleteComment} className='comment-dropdown-delete'>
        //                                 <i className=" comment-delete-button fa-regular fa-trash-can"><span className='comment-delete-text'>Delete</span></i>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )}
        //             </div>
        //             <div className='comment-headline'>
        //                 {commenter.headline}
        //             </div>
        //             {isUpdateFormVisible ? (
        //                 <form className='comment-update-form' onSubmit={(e) => handleSubmitUpdateForm(commentId)}>
        //                     <input ref={inputRef} className='comment-update-input' type='text' value={commentContent} onChange={handleChangeUpdateContent} />
        //                     <div className='comment-update-buttons'>
        //                         <button className='comment-update-save' type='submit'>Save Changes</button>
        //                         <button className='comment-update-cancel' >Cancel</button>
        //                     </div>
        //                 </form>
        //             ) : (
        //                 <div className='comment-content'>{comment.content}</div>
        //             )}
        //         </div>
        //     </div >
        // )