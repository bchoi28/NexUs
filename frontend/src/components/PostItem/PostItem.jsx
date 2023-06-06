import './PostItem.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getUser } from '../../store/user';
import { deletePost } from '../../store/post';

const PostItem = ({ post }) => {
    // const { id, body, created_at, authorId } = post;
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

    const user = useSelector(getUser);

    if (!user) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const userId = currentUser?.id;
        if (userId) {
            dispatch(fetchUser(userId));
        }
        return <h1>Loading...</h1>;
    }

    const currentUser = user;
    const userId = currentUser?.id;
    const isCurrentUserPost = userId && userId === post.authorId;

    // useEffect(() => {
    //     dispatch(fetchUser());
    // }, [])

    // if (!currentUser) {
    //     return (
    //         <div>Loading Post...</div>
    //     )
    // }

    const handleDeletePost = (e) => {
        dispatch(deletePost(post.id))
    }


    return (
        <div className='post-item-container'>
            <header className='post-header'>
                <img src="" alt="profile" />
                <div className='post-names-headline'>
                    <div className='post-author-names' >{post.author.fName} {post.author.lName}
                        <span className="post-author-pronouns">({post.author.pronouns})</span>
                    </div>
                    <div className='post-author-headline' >{post.author.headline}</div>
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
                                Delete Post
                            </div>
                            <div
                                className='post-update-button'
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
            <img src={post.photoUrl} alt="post" />
            <div className='post-footer'>Like Comment Bar</div>

        </div>
    )
}

export default React.memo(PostItem);