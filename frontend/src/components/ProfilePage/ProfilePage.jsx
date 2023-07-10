import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './ProfilePage.css';
import { fetchUser, getUser } from '../../store/user';
import FeedNavBar from '../FeedNavBar';
import { useParams } from 'react-router-dom';
import { openModal } from '../../store/modal';
import ModalRoot from '../Modal/ModalRoot';
import { fetchSessionUser, getSessionUser } from '../../store/session';
import { removeUser } from '../../store/user';
import Login from '../Login/Login';


const ProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // upon navigating to profile/:id, profileUser will be initially null
    const profileUser = useSelector(getUser)
    // const [isTruncated, setIsTruncated] = useState(true);

    // currentUser = { userObject }
    const currentUser = useSelector(getSessionUser);


    // const handleReadMoreClick = () => {
    //     setIsTruncated(!isTruncated);
    // };
    // const renderTruncatedText = () => {
    //     debugger
    //     if (!profileUser || !profileUser.about) {
    //         return "";
    //     } else {
    //         const text = profileUser.about.slice(0, 347);
    //         return text;
    //     }
    // };

    const profileCoverPhoto = profileUser?.coverPhotoUrl;
    const profilePhoto = profileUser?.photoUrl;

    const handleEditCoverPhoto = (e) => {
        e.preventDefault();
        dispatch(openModal('UpdateCoverPhoto', { profileCoverPhoto: profileCoverPhoto }))
    }
    const handleEditAbout = (e) => {
        e.preventDefault();
        dispatch(openModal('UpdateAboutModal', { about: profileUser.about }))
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const profileInfo = {
            fName: profileUser.fName,
            lName: profileUser.lName,
            headline: profileUser.headline,
            pronouns: profileUser.pronouns,
            locationCity: profileUser.locationCity,
            locationCountryRegion: profileUser.locationCountryRegion
        }
        dispatch(openModal('UpdateProfileModal', profileInfo))
    }

    useEffect(() => {
        debugger
        dispatch(fetchUser(id))
        return () => {
            debugger
            dispatch(removeUser());
        };
    }, [id])

    if (!profileUser) {
        return <Login />
    }

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        dispatch(fetchSessionUser(currentUser.id))
        return <h1>Loading...</h1>;
    }

    const cameraIcon = (currentUser.id === parseInt(id)) ? <i onClick={handleEditCoverPhoto} class="fa-solid fa-camera camera-button"></i> : null;

    const aboutEditIcon = (currentUser.id === parseInt(id)) ? <i onClick={handleEditAbout} class="edit-about-button fa-solid fa-pencil"></i> : null;
    const profileUpdateIcon = (currentUser.id === parseInt(id)) ? <i onClick={handleUpdateProfile} class="edit-profile-info-button fa-solid fa-pencil"></i> : null;



    return (
        <>
            <ModalRoot />
            <div className='profile-page-container'>
                <header className='feed-navbar-container'>
                    <FeedNavBar />
                </header>
                <div className='profile-main-container'>

                    <div className='profile-left-container'>

                        <div className='profile-left-content'>
                            <div className='profile-content-intro' >
                                <img className='profile-intro-background-image' src={profileCoverPhoto} alt="banner" />
                                <div className='profile-photo-camera-container'>
                                    <img className='profile-page-photo' src={profilePhoto} alt="" />
                                    <div className='camera-icon-container'>
                                        {cameraIcon}
                                    </div>
                                </div>
                                <div className='profile-intro-info' >
                                    <div className='profile-intro-info-left'>
                                        <div className='profile-intro-name-pronouns'>
                                            <div className='profile-intro-name'>{profileUser.fName} {profileUser.lName}</div>
                                            <div className='profile-intro-pronouns'>({profileUser.pronouns})</div>
                                        </div>
                                        <div className='profile-intro-headline'>{profileUser.headline}</div>
                                        <div className='profile-intro-location'>{profileUser.locationCity}, {profileUser.locationCountryRegion} </div>
                                        <div className='profile-intro-connection-count'>500+ alliances</div>
                                    </div>
                                    <div className='profile-intro-info-right'>
                                        {profileUpdateIcon}
                                    </div>
                                </div>
                            </div>


                            <div className="profile-content-about">
                                <div className="profile-about-header">
                                    <div>About</div>
                                    <div>
                                        {aboutEditIcon}
                                    </div>
                                </div>
                                <div className="profile-about-body">
                                    {/* <div>{isTruncated ? renderTruncatedText() : profileUser.about}</div> */}
                                    <div>{profileUser.about}</div>
                                </div>
                                {/* {profileUser.about?.length > 347 && (
                                    <button className='see-more-button' onClick={handleReadMoreClick}>
                                        {isTruncated ? "see more" : "see less"}
                                    </button>
                                )} */}
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