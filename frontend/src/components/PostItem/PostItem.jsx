import './PostItem.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { openModal } from '../../store/modal';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, getLikeInformation, getCommentCount } from '../../store/post';
import { NavLink } from 'react-router-dom';
import { fetchSessionUser, getSessionUser } from '../../store/session';
import Like from '../Like';
import Comment from '../Comment';

const PostItem = React.memo(({ post }) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const { likeCount, likers } = useSelector(getLikeInformation(post.id)) || {};
    const commentCount = useSelector(getCommentCount(post.id));
    const currentUser = useSelector(getSessionUser)

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);

    const handleDropDownStatus = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
        setDropDownOpen(!dropDownOpen);
        document.body.style.overflow = 'hidden'
    };
    const handleCloseModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        dispatch(fetchSessionUser(currentUser.id))
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

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch(fetchSessionUser(currentUser.id))
        }
        return <h1>Loading...</h1>;
    }

    const isCurrentUserPost = currentUser.id && currentUser.id === post.authorId;

    const createdDate = new Date(post.createdAt);
    const updatedDate = new Date(post.updatedAt);
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

    const handleDeletePost = (e) => {
        dispatch(deletePost(post.id))
        setDropDownOpen(!dropDownOpen);
    }

    const handleViewLikeCount = (e) => {
        e.preventDefault();
        dispatch(openModal('LikeCountModal', { likers: likers, likeCount: likeCount }));
        document.body.style.overflow = 'hidden'
    }

    const handleOpenComment = () => {
        setCommentOpen(!commentOpen);
    }

    const authorPhoto = post.author.photoUrl ? post.author.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    const postPhoto = post.photoUrl ? <img src={post.photoUrl} alt="post" /> : null
    return (
        <>
            <div className='post-item-container'>
                <header className='post-header'>
                    <NavLink to={`/profile/${post.authorId}`}>
                        <img className='post-profile-pic' src={authorPhoto} alt="profile" />
                    </NavLink>
                    <div className='post-names-headline'>
                        <NavLink className='post-author-names' to={`/profile/${post.authorId}`}>
                            {post.author.fName} {post.author.lName}
                        </NavLink>
                        <span className="post-author-pronouns">{post.author.pronouns ? `(${post.author.pronouns})` : null}</span>
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
                                <div className='comment-dropdown-container'>
                                    <div className='comment-dropdown-update' onClick={handleOpenModal}>
                                        <i className=" comment-update-button fa-solid fa-pencil"><span className='comment-update-text'>Edit</span></i>
                                    </div>
                                    <div onClick={handleDeletePost} className='comment-dropdown-delete'>
                                        <i className=" comment-delete-button fa-regular fa-trash-can"><span className='comment-delete-text'>Delete</span></i>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>


                    {modalIsOpen &&
                        <ModalContainer
                            isOpen={modalIsOpen}
                            onRequestClose={handleCloseModal}
                            isPost={true}
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
                    <div className='like-comment-count-container'>
                        <div className='like-count-container' onClick={handleViewLikeCount}>
                            <i className="like-count-icon fa-regular fa-thumbs-up fa-flip-horizontal"></i>
                            <p className='like-count-text'>{likeCount}</p>
                        </div>
                        {commentCount ? (
                            <div className='comment-count-container' onClick={handleOpenComment}>
                                <div className='comment-count-text'>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</div>
                            </div>

                        ) : null}
                    </div>
                ) : (
                    null
                )}
                <div className='post-footer'>
                    <div className='post-footer-buttons'>
                        <Like postId={post.id} setCommentOpen={setCommentOpen} />
                        <button className='comment-button-container' onClick={handleOpenComment}>
                            <i className="comment-button fa-regular fa-comment-dots"></i>
                            <p className='comment-text'>Comment</p>
                        </button>
                        <button className='repost-button-container' >
                            <i className=" repost-button fa-solid fa-retweet"></i>
                            <p className='repost-text'>Repost</p>
                            <span className="tooltip-text">coming soon!</span>
                        </button>
                        <button className='send-button-container'>
                            <i className="send-button fa-regular fa-paper-plane"></i>
                            <p className='send-text'>Send</p>
                            <span className="tooltip-text">coming soon!</span>

                        </button>
                    </div>
                    {commentOpen &&
                        <Comment postId={post.id} />
                    }
                </div>
            </div>
        </>
    )
})

export default PostItem;