import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './ProfilePage.css';
import { fetchUser, getUser } from '../../store/user';
import FeedNavBar from '../FeedNavBar';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { openModal } from '../../store/modal';
import ModalRoot from '../Modal/ModalRoot';



const ProfilePage = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);
    const [isTruncated, setIsTruncated] = useState(true);

    const handleReadMoreClick = () => {
        setIsTruncated(!isTruncated);
    };

    const renderTruncatedText = () => {
        const text = currentUser.about.slice(0, 300); // Change 100 to whatever length you need
        return text + (currentUser.about.length > 300 ? "..." : "");
    };

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        dispatch(fetchUser(currentUser.id));
        return <h1>Loading...</h1>;
    }

    const handleEditAbout = (e) => {
        debugger
        e.preventDefault();
        dispatch(openModal('UpdateAboutModal', { about: currentUser.about }))
    }



    return (
        <>
            <ModalRoot />
            <div className='profile-page-container'>
                <header className='feed-navbar-container'>
                    <FeedNavBar currentUser={currentUser} />
                </header>
                <div className='profile-main-container'>

                    <div className='profile-left-container'>

                        <div className='profile-left-content'>
                            <div className='profile-content-intro' >
                                <img className='profile-intro-background-image' src="https://nexus-seeds.s3.amazonaws.com/nexus-images/badge-background.png" alt="banner" />
                                <div>
                                    <img className='profile-page-photo' src={currentUser.photoUrl} alt="" />
                                </div>
                                <div className='profile-intro-info' >
                                    <div className='profile-intro-info-left'>
                                        <div className='profile-intro-name-pronouns'>
                                            <div className='profile-intro-name'>{currentUser.fName} {currentUser.lName}</div>
                                            <div className='profile-intro-pronouns'>({currentUser.pronouns})</div>
                                        </div>
                                        <div className='profile-intro-headline'>{currentUser.headline}</div>
                                        <div className='profile-intro-location'>{currentUser.locationCity}, {currentUser.locationCountryRegion} </div>
                                        <div className='profile-intro-connection-count'>500+ alliances</div>
                                    </div>
                                    <div className='profile-intro-info-right'>
                                        edit
                                        education
                                    </div>
                                </div>
                            </div>


                            <div className="profile-content-about">
                                <div className="profile-about-header">
                                    <div>About</div>
                                    <div>
                                        <i onClick={handleEditAbout} class="edit-about-button fa-solid fa-pencil"></i>
                                    </div>
                                </div>
                                <div className="profile-about-body">
                                    <div>{isTruncated ? renderTruncatedText() : currentUser.about}</div>
                                </div>
                                {currentUser.about.length > 300 && (
                                    <button className='see-more-button' onClick={handleReadMoreClick}>
                                        {isTruncated ? "see more" : "see less"}
                                    </button>
                                )}
                            </div>

                        </div>

                    </div>



                    <div className='profile-right-container'>
                        <div className='profile-right-content'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;