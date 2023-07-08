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
import { Link, NavLink } from 'react-router-dom';

const Feed = () => {

    const dispatch = useDispatch();

    // we need to pass these 2 in wherever we render ModalContainer
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = 'hidden'
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = '';
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
                        <div className='about-developer-container'>
                            <div className='about-developer-title'>About the developer</div>
                            <img className='about-developer-image' src='assets/images/seeds/developer2.jpeg' alt="developer" />
                            <p className='about-developer-text'>Brandon Choi is a fullstack engineer proficient in JavaScript, React/Redux, Ruby, and Ruby on Rails.</p>
                            <p className='about-developer-text'>A former Physical Therapist, Brandon has redirected his passion for helping others towards the field of software engineering!</p>
                            <div className='about-developer-title'>Connect</div>
                            <div className='connect-icon-container'>
                                {/* <div className='connect-icon-nexus-container'>
                                    <NavLink to='/profile/1' target="_blank" className='connect-icon-nexus'>us</NavLink>
                                    <p className='connect-icon-nexus-text'>NexUs</p>
                                </div> */}
                                <Link to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank">
                                    <div className='icon-container'>
                                        <i class="fa-brands fa-linkedin-in main-nav-icons"></i>
                                        <span className="icon-text">LinkedIn</span>
                                    </div>
                                </Link>
                                <Link to={{ pathname: 'https://github.com/bchoi28' }} target="_blank">
                                    <div className='icon-container'>
                                        <i class="fa-brands fa-github main-nav-icons"></i>
                                        <span className="icon-text">GitHub</span>
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className='about-project-container'>
                            <div className='about-developer-title'>About the project</div>
                            <p className='about-developer-text'>NexUs is a fullstack LinkedIn clone developed for intergalactic professional networking.</p>
                            <div className='about-project-technologies-title'>Technologies used:</div>
                            <div className='technologies-container'>
                                <div>JavaScript</div>
                                <div>React</div>
                                <div>Redux</div>
                                <div>Ruby</div>
                                <div>Rails</div>
                                <div>HTML5</div>
                                <div>CSS3</div>
                                <div>AWS S3</div>
                                <div>PostgreSQL</div>
                                <div>Render</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Feed;