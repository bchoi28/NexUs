import './Feed.css';
import FeedNavBar from '../FeedNavBar';
import ProfileBadge from '../ProfileBadge';
import PostIndex from '../PostIndex';
import { useEffect, useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, fetchUser } from '../../store/user';
import { fetchPosts, getPosts } from '../../store/post';

const Feed = () => {

    const dispatch = useDispatch();

    // we need to pass these 2 in wherever we render ModalContainer
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const currentUser = useSelector(getUser);
    const posts = useSelector(getPosts)

    useEffect(() => {
        if (!currentUser || !currentUser.photoUrl) {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            dispatch(fetchUser(currentUser.id));
        }

        if (!posts) {
            dispatch(fetchPosts());
        }

    }, [])
    // remove currentUser, posts to re-fetch data every time

    if (!currentUser || !posts) {
        return <h1>Loading Feed...</h1>
    }

    return (
        <div className='feed-page-container'>

            <header className='feed-navbar-container'>
                <FeedNavBar currentUser={currentUser} />
            </header>

            <div className='feed-container'>

                <div className='feed-left'>
                    <ProfileBadge currentUser={currentUser} />
                </div>

                <div className='feed-middle'>
                    <div className='feed-post-form-container'>
                        <div className='feed-post-form-top'>
                            {currentUser && <img className='feed-user-profile-pic' src={currentUser.photoUrl} alt="profile" />}
                            <button className='feed-create-post-button' onClick={handleOpenModal}>Start a post</button>

                            {modalIsOpen &&
                                <ModalContainer
                                    isOpen={modalIsOpen}
                                    onRequestClose={handleCloseModal}
                                >
                                    <ModalSwitch modalType='createPost' handleClose={handleCloseModal} currentUser={currentUser} />
                                </ModalContainer>
                            }

                        </div>
                        <div className='feed-post-form-bottom' >
                            <i class="fa-regular fa-image feed-photo-icon" >
                                <span className='feed-photo-icon-text' >Photo</span>
                            </i>
                            <i class="fa-solid fa-video feed-video-icon">
                                <span className='feed-video-icon-text' >Video</span>

                            </i>
                            <i class="fa-regular fa-calendar-plus feed-calendar-icon">
                                <span className='feed-calendar-icon-text' >Event</span>

                            </i>
                            <i class="fa-solid fa-newspaper feed-article-icon">
                                <span className='feed-article-icon-text' >Write article</span>

                            </i>
                        </div>
                        {/* <PostForm /> */}
                    </div>
                    <div className='post-index-container'>
                        <PostIndex />
                    </div>
                </div>

                <div className='feed-right'>

                </div>
            </div>

        </div>
    )
}

export default Feed;