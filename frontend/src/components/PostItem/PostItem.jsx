import './PostItem.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getUser } from '../../store/user';
import { deletePost } from '../../store/post';

const PostItem = ({ post }) => {
    debugger
    // const { id, body, created_at, authorId } = post;
    const dispatch = useDispatch();

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

    const currentUser = useSelector(getUser);

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const userId = currentUser?.id;
        if (userId) {
            dispatch(fetchUser(userId));
        }
        return <h1>Loading...</h1>;
    }

    const isCurrentUserPost = currentUser.id && currentUser.id === post.authorId;

    const createdDate = new Date(post.createdAt); // Convert `created_at` to a JavaScript Date object
    const updatedDate = new Date(post.updatedAt);
    const currentDateTime = new Date(); // Get the current date and time

    const wasEdited = updatedDate.getTime() - createdDate.getTime() > 5000; // 60,000 milliseconds = 1 minute
    debugger
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

    const postPhoto = post.photoUrl ? <img className='post-photo-container' src={post.photoUrl} alt="post" /> : null


    return (
        <div className='post-item-container'>
            <header className='post-header'>
                <img className='post-profile-pic' src={post.author.photoUrl} alt="profile" />
                <div className='post-names-headline'>
                    <div className='post-author-names' >{post.author.fName} {post.author.lName}
                        <span className="post-author-pronouns">({post.author.pronouns})</span>
                    </div>
                    <div className='post-author-headline' >{post.author.headline}</div>
                    <span className='feed-post-timestamp' >{timeAgo}</span>
                </div>
                <div className='post-dropdown-container'>
                    {isCurrentUserPost &&
                        <button
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
                                DELETE
                            </div>
                            <div
                                className='post-update-button'
                                onClick={handleOpenModal}
                            >
                                EDIT
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
            <div className='post-footer'>Like Comment Bar</div>

        </div>
    )
}

export default PostItem;