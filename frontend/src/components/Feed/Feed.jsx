import './Feed.css';
import FeedNavBar from '../FeedNavBar';
import ProfileBadge from '../ProfileBadge';
import PostIndex from '../PostIndex';
import { useEffect, useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import ModalRoot from '../Modal/ModalRoot';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, getUser, fetchUser } from '../../store/user';
import { fetchPosts, getPosts } from '../../store/post';
import { getSessionUser, fetchSessionUser } from '../../store/session';

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

    const currentUser = useSelector(getSessionUser);
    const posts = useSelector(getPosts)


    useEffect(() => {
        if (!currentUser || !currentUser.photoUrl) {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            dispatch(fetchSessionUser(currentUser.id));
        }
        if (!posts) {
            dispatch(fetchPosts());
        }
        return () => {
            dispatch(removeUser());
        }
    }, [])


    if (!currentUser || !posts) {
        return <h1>Loading Feed...</h1>
    }

    // optional space theme

    // window.addEventListener('scroll', function () {
    //     var mainElement = document.getElementById('main');
    //     var scrollPosition = window.scrollY;

    //     if (scrollPosition > 0) {
    //         mainElement.classList.add('space-effect');
    //     } else {
    //         mainElement.classList.remove('space-effect');
    //     }
    // });


    return (
        <>
            <ModalRoot />

            <div className='feed-page-container scroll-effect' id='main'>

                <header className='feed-navbar-container'>
                    <FeedNavBar />
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
        </>

    )
}

export default Feed;