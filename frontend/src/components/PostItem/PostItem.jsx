import './PostItem.css';
import React from 'react';
import { useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/user';
import { deletePost } from '../../store/post';

const PostItem = ({ post }) => {
    // const { id, body, image_url, created_at, author } = post;
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    };
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const handleDropDownStatus = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const currentUser = useSelector(getUser);
    const isCurrentUserPost = currentUser && currentUser.id === post.authorId;

    const handleDeletePost = (e) => {
        dispatch(deletePost(post.id))
    }


    return (
        <div className='post-item-container'>
            <header className='post-header'>
                <img src="" alt="profile" />
                <div className='post-names-headline'>
                    <div>{post.author.fName} {post.author.lName}</div>
                    <div>headline</div>
                </div>
                <div>pronouns</div>
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
                                onClick={handleDeletePost}
                            >
                                Delete Post
                            </div>
                            <div
                                onClick={handleOpenModal}
                            >
                                Update Post
                            </div>

                        </div>
                    }
                </div>


                {modalIsOpen &&
                    <ModalContainer
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                    >
                        <ModalSwitch modalType='updatePost' handleClose={handleCloseModal} post={post} />
                    </ModalContainer>
                }

            </header>
            <div className='post-body'>
                {post.body}
            </div>
            {post.imageURL && <img
                className='post-image'
                src={post.imageURL}
                alt="post"
            />}
            <div className='post-footer'>Like Comment Bar</div>

        </div>
    )
}

export default React.memo(PostItem);