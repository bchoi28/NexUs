import './PostItem.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import ModalRoot from '../Modal/ModalRoot';
import { openModal, closeModal } from '../../store/modal';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, getLikeCount, getLikes } from '../../store/post';
import { NavLink } from 'react-router-dom';
import { fetchSessionUser, getSessionUser } from '../../store/session';
import Like from '../Like';

const PostItem = React.memo(({ post }) => {
    // const { id, body, created_at, authorId } = post;
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const likeCount = useSelector(getLikeCount(post.id));
    const likes = useSelector(getLikes(post.id));
    debugger
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
        setDropDownOpen(!dropDownOpen);
    };
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const handleDropDownStatus = () => {
        setDropDownOpen(!dropDownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropDownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const currentUser = useSelector(getSessionUser)

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch(fetchSessionUser(currentUser.id))
        }
        return <h1>Loading...</h1>;
    }

    const isCurrentUserPost = currentUser.id && currentUser.id === post.authorId;

    const createdDate = new Date(post.createdAt); // Convert `created_at` to a JavaScript Date object
    const updatedDate = new Date(post.updatedAt);
    const currentDateTime = new Date(); // Get the current date and time

    const wasEdited = updatedDate.getTime() - createdDate.getTime() > 5000; // 60,000 milliseconds = 1 minute
    const timeDifference = currentDateTime - createdDate; // Calculate the difference in milliseconds

    // Calculate the difference in hours and minutes
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

    const handleDeletePost = (e) => {
        dispatch(deletePost(post.id))
        setDropDownOpen(!dropDownOpen);
    }

    const handleViewLikeCount = (e) => {
        e.preventDefault();
        dispatch(openModal('LikeCountModal', { likes: likes }))
    }

    const postPhoto = post.photoUrl ? <img className='post-photo-container' src={post.photoUrl} alt="post" /> : null

    return (
        <div className='post-item-container'>
            <ModalRoot />
            <header className='post-header'>
                <img className='post-profile-pic' src={post.author.photoUrl} alt="profile" />
                <div className='post-names-headline'>
                    <NavLink className='profile-links' to={`/profile/${post.authorId}`} profileUser={post.author}>
                        <div className='post-author-names' >{post.author.fName} {post.author.lName}
                            <span className="post-author-pronouns">({post.author.pronouns})</span>
                        </div>
                    </NavLink>
                    <div className='post-author-headline' >{post.author.headline}</div>
                    <span className='feed-post-timestamp' >{timeAgo}</span>
                </div>
                <div className='post-dropdown-container'>
                    {isCurrentUserPost &&
                        <button
                            ref={dropdownRef}
                            className='post-dropdown-icon'
                            onClick={handleDropDownStatus}
                        >...</button>
                    }
                    {dropDownOpen &&
                        <div className='post-dropdown-menu'>
                            <div
                                className='post-delete-button'
                                onClick={handleDeletePost}
                            >
                                <i className=" delete-button fa-regular fa-trash-can"></i>
                            </div>
                            <div
                                className='post-update-button'
                                onClick={handleOpenModal}
                            >
                                <i className=" edit-button fa-solid fa-pencil"></i>
                            </div>
                        </div>
                    }
                </div>


                {modalIsOpen &&
                    <ModalContainer
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                    >
                        <ModalSwitch modalType='updatePost' handleClose={handleCloseModal} post={post} currentUser={currentUser} />
                    </ModalContainer>
                }

            </header>
            <div className='post-body'>
                {post.body}
            </div>
            <div className='post-photo-container'>
                {postPhoto}
            </div>
            {likeCount ? (
                <div className='like-count-container' onClick={handleViewLikeCount}>
                    <i className="like-count-icon fa-regular fa-thumbs-up fa-flip-horizontal"></i>
                    <p className='like-count-text'>{likeCount}</p>
                </div>
            ) : (
                null
            )}
            <div className='post-footer'>
                <Like postId={post.id} />
                <button className='comment-button-container'>
                    <i class="comment-button fa-regular fa-comment-dots"></i>
                    <p className='comment-text'>Comment</p>
                </button>
                <button className='repost-button-container' >
                    <i class=" repost-button fa-solid fa-retweet"></i>
                    <p className='repost-text'>Repost</p>
                </button>
                <button className='send-button-container'>
                    <i class="send-button fa-regular fa-paper-plane"></i>
                    <p className='send-text'>Send</p>
                </button>
            </div>

        </div>
    )
})

export default PostItem;