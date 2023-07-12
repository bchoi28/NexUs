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
                                <i className="fa-regular fa-image feed-photo-icon" >
                                    <span className='feed-photo-icon-text' >Photo</span>
                                    <span className="post-form-tooltip-text">coming soon!</span>
                                </i>
                                <i className="fa-solid fa-video feed-video-icon">
                                    <span className='feed-video-icon-text' >Video</span>
                                    {/* <span className="post-form-tooltip-text">coming soon!</span> */}
                                </i>
                                <i className="fa-regular fa-calendar-plus feed-calendar-icon">
                                    <span className='feed-calendar-icon-text' >Event</span>
                                    {/* <span className="post-form-tooltip-text">coming soon!</span> */}
                                </i>
                                <i className="fa-solid fa-newspaper feed-article-icon">
                                    <span className='feed-article-icon-text' >Write article</span>
                                    {/* <span className="post-form-tooltip-text">coming soon!</span> */}
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
                            <div className='about-developer-connect-title'>Connect</div>
                            <div className='connect-icon-container'>
                                <NavLink to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank" className='icon-container'>
                                    <i className="fa-brands fa-linkedin-in main-nav-icons"></i>
                                    <span className="icon-text">LinkedIn</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank" className='icon-container'>
                                    <i className="fa-regular fa-address-card main-nav-icons"></i>
                                    <span className="icon-text">Portfolio</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://github.com/bchoi28' }} target="_blank" className='icon-container'>
                                    <i className="fa-brands fa-github main-nav-icons"></i>
                                    <span className="icon-text">GitHub</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://wellfound.com/u/brandon-choi-6' }} target="_blank" className='icon-container'>
                                    <i className="fa-brands fa-angellist main-nav-icons"></i>
                                    <span className="icon-text">AngelList</span>
                                </NavLink>
                            </div>

                        </div>
                        <div className='about-project-container'>
                            <div className='about-developer-title'>About the project</div>
                            <p className='about-developer-text'>NexUs is a fullstack LinkedIn clone developed for intergalactic professional networking.</p>
                            <div className='about-project-technologies-title'>Technologies used:</div>
                            <div className='technologies-container'>
                                <div className='technologies-row'>
                                    <div className='technology-item'><span>JavaScript</span></div>
                                    <div className='technology-item'><span>React</span></div>
                                    <div className='technology-item'><span>Redux</span></div>
                                </div>
                                <div className='technologies-row'>
                                    <div className='technology-item'><span>Ruby</span></div>
                                    <div className='technology-item'><span>Rails</span></div>
                                    <div className='technology-item'><span>HTML5</span></div>
                                </div>
                                <div className='technologies-row'>
                                    <div className='technology-item'><span>CSS3</span></div>
                                    <div className='technology-item'><span>AWS S3</span></div>
                                    <div className='technology-item'><span>PostgreSQL</span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Feed;