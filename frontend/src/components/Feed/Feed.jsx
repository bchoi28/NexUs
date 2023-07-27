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
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Login';

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
    const profilePhoto = currentUser.photoUrl;


    useEffect(() => {
        // if (!currentUser || !currentUser.photoUrl) {
        //     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        //     dispatch(fetchSessionUser(currentUser.id));
        // }
        if (!posts) {
            dispatch(fetchPosts());
        }
        return () => {
            dispatch(removeUser());
        }
    }, [])


    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        dispatch(fetchSessionUser(currentUser.id));
        return <Redirect to='/login' />
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
                        <ProfileBadge user={currentUser} />
                    </div>

                    <div className='feed-middle'>
                        <div className='feed-post-form-container'>
                            <div className='feed-post-form-top'>
                                {currentUser && <img className='feed-user-profile-pic' src={profilePhoto ? profilePhoto : '/assets/images/seeds/default-profile-image-circle.png'} alt="profile" />}
                                <button className='feed-create-post-button' onClick={handleOpenModal}>Start a post</button>

                                {modalIsOpen &&
                                    <ModalContainer
                                        isOpen={modalIsOpen}
                                        onRequestClose={handleCloseModal}
                                        isPost={true}
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
                                <NavLink to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank" className='me-icon-container'>
                                    <i className="fa-brands fa-linkedin-in me-icon-links"></i>
                                    <span className="icon-text">LinkedIn</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank" className='me-icon-container'>
                                    <i className="fa-regular fa-address-card me-icon-links"></i>
                                    <span className="icon-text">Portfolio</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://github.com/bchoi28' }} target="_blank" className='me-icon-container'>
                                    <i className="fa-brands fa-github me-icon-links"></i>
                                    <span className="icon-text">GitHub</span>
                                </NavLink>
                                <NavLink to={{ pathname: 'https://wellfound.com/u/brandon-choi-6' }} target="_blank" className='me-icon-container'>
                                    <i className="fa-brands fa-angellist me-icon-links"></i>
                                    <span className="icon-text">AngelList</span>
                                </NavLink>
                            </div>

                        </div>
                        <div className='about-project-container'>
                            <div className='about-developer-title'>About the project</div>
                            <p className='about-developer-text'>NexUs is a fullstack LinkedIn clone developed for multiversal professional networking.</p>
                            {/* <div className='about-project-technologies-title'>Technologies used:</div> */}
                            <div className='technologies-container'>
                                <div className='technologies-row'>
                                    <NavLink to={{ pathname: 'https://www.javascript.com' }} target='_blank' className='technology-item'><span>JavaScript</span></NavLink>
                                    <NavLink to={{ pathname: 'https://react.dev' }} target='_blank' className='technology-item'><span>React</span></NavLink>
                                    <NavLink to={{ pathname: 'https://redux.js.org' }} target='_blank' className='technology-item'><span>Redux</span></NavLink>
                                </div>
                                <div className='technologies-row'>
                                    <NavLink to={{ pathname: 'https://www.ruby-lang.org/en' }} target='_blank' className='technology-item'><span>Ruby</span></NavLink>
                                    <NavLink to={{ pathname: 'https://rubyonrails.org' }} target='_blank' className='technology-item'><span>Rails</span></NavLink>
                                    <NavLink to={{ pathname: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }} target='_blank' className='technology-item'><span>HTML5</span></NavLink>
                                </div>
                                <div className='technologies-row'>
                                    <NavLink to={{ pathname: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }} target='_blank' className='technology-item'><span>CSS3</span></NavLink>
                                    <NavLink to={{ pathname: 'https://aws.amazon.com/s3' }} target='_blank' className='technology-item'><span>AWS S3</span></NavLink>
                                    <NavLink to={{ pathname: 'https://www.postgresql.org/' }} target='_blank' className='technology-item'><span>PostgreSQL</span></NavLink>
                                </div>
                            </div>
                            <div className='feed-about-project-logo-container'>
                                <div className="splash-nav-logo feed-about-project-logo">Nex
                                </div>
                                <div className='feed-about-project-logo-us'>
                                    <span>us</span>
                                </div>
                                <div className='feed-project-text'>NexUs Corporation © 2023</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Feed;