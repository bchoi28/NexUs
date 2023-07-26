import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ProfilePage.css';
import { fetchUser, getUser } from '../../store/user';
import FeedNavBar from '../FeedNavBar';
import { useParams, NavLink } from 'react-router-dom';
import { openModal } from '../../store/modal';
import ModalRoot from '../Modal/ModalRoot';
import { getSessionUser } from '../../store/session';
import { removeUser, getOtherUsers, fetchAllOtherUsers } from '../../store/user';
import Login from '../Login/Login';
import ExperienceItem from '../Experience';
import { fetchAllUserConnections, fetchAllUserConnectionsConnectedPending, getConnections } from '../../store/connection';
import OtherUserItem from './OtherUserItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const profileUser = useSelector(getUser)
    const experiences = profileUser?.experiences ? Object.values(profileUser.experiences) : null;
    const sortedExperiences = experiences ? experiences.sort((a, b) => {
        // if end date is null (current), move it to the front
        if (!a.endDate) return -1;
        if (!b.endDate) return 1;
        // sort by end date in descending order
        return new Date(b.endDate) - new Date(a.endDate);
    }) : null;

    const experienceList = sortedExperiences?.map(experience => {
        return <ExperienceItem key={experience.id} experience={experience} />;
    });

    const currentUser = useSelector(getSessionUser);
    if (!currentUser) {
        history.push('/login');
    }
    const connections = Object.values(useSelector(getConnections));
    const connectionsCount = connections?.length;

    const otherUsers = useSelector(getOtherUsers).filter(user => user.id !== currentUser.id);
    const otherUsersList = otherUsers?.map(otherUser => {
        return <OtherUserItem user={otherUser} key={otherUser.id} />
    })
    // const [isTruncated, setIsTruncated] = useState(true);

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

    const profileCoverPhoto = profileUser?.coverPhotoUrl ? profileUser.coverPhotoUrl : '/assets/images/seeds/badge-background.png';
    const profilePhoto = profileUser?.photoUrl ? profileUser.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    const handleEditCoverPhoto = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'

        dispatch(openModal('UpdateCoverPhoto', { profileCoverPhoto: profileUser.coverPhotoUrl ? profileUser.coverPhotoUrl : null }))
    }
    const handleEditAbout = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'

        dispatch(openModal('UpdateAboutModal', { about: profileUser.about }))
    }

    const handleAddExperience = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'
        dispatch(openModal('AddExperienceModal'));
    }

    const handleEditProfile = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'

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
        if (currentUser) {
            dispatch(fetchUser(id));
            dispatch(fetchAllUserConnections(id));
            dispatch(fetchAllOtherUsers(id));
            dispatch(fetchAllUserConnectionsConnectedPending());
        }
        return () => {
            dispatch(removeUser());
        };
    }, [id])

    if (!currentUser || !profileUser) {
        return <Login />
    }


    // if (!currentUser) {
    //     debugger
    //     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //     dispatch(fetchSessionUser(currentUser.id))
    //     return <h1>Loading...</h1>;
    // }


    // if (!currentUser) {
    //     // return <Redirect to='/' />
    // }

    const cameraIcon = (currentUser.id === parseInt(id)) ? <i onClick={handleEditCoverPhoto} className="fa-solid fa-camera camera-button"></i> : null;

    const aboutEditIcon = (currentUser.id === parseInt(id)) ?
        <i onClick={handleEditAbout} className="edit-about-button fa-solid fa-pencil"></i> : null;
    const profileEditIcon = (currentUser.id === parseInt(id)) ?
        <i onClick={handleEditProfile} className="edit-profile-info-button fa-solid fa-pencil"></i> : null;
    const experienceAddIcon = (currentUser.id === parseInt(id)) ?
        <i onClick={handleAddExperience} className="add-experience-button fa-solid fa-plus"></i> : null;

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
                                    <img className='profile-page-photo' src={profilePhoto} alt="profile" />
                                    <div className='camera-icon-container'>
                                        {cameraIcon}
                                    </div>
                                </div>
                                <div className='profile-intro-info' >
                                    <div className='profile-intro-info-left'>
                                        <div className='profile-intro-name-pronouns'>
                                            <div className='profile-intro-name'>{profileUser.fName} {profileUser.lName}</div>
                                            {profileUser.pronouns ? (
                                                <div className='profile-intro-pronouns'>{profileUser.pronouns}</div>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                        <div className='profile-intro-headline'>{profileUser.headline}</div>
                                        {profileUser.locationCity ? (
                                            <div className='profile-intro-location'>{profileUser.locationCity}, {profileUser.locationCountryRegion} </div>
                                        ) : null}
                                        <NavLink to='/mynetwork'>
                                            <div className='profile-intro-connection-count'>{connectionsCount} {connectionsCount === 1 ? 'alliance' : 'alliances'}</div>
                                        </NavLink>
                                    </div>
                                    <div className='profile-intro-info-right'>
                                        {profileEditIcon}
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
                                    <div>{profileUser.about ? profileUser.about : <div style={{ fontStyle: 'italic', color: 'var(--color-text-light)' }}>no bio added</div>}</div>
                                </div>
                                {/* {profileUser.about?.length > 347 && (
                                    <button className='see-more-button' onClick={handleReadMoreClick}>
                                        {isTruncated ? "see more" : "see less"}
                                    </button>
                                )} */}
                            </div>

                            <div className="profile-experience-container">
                                <div className="profile-experience-header">
                                    <div>Experience</div>
                                    <div>
                                        {experienceAddIcon}
                                    </div>
                                </div>
                                {!experienceList && <div className='no-experiences-added'>no experiences added</div>}

                                {experienceList}
                            </div>

                        </div>

                    </div>



                    <div className='profile-right-container'>
                        <div className='profile-right-header'>People also viewed</div>
                        {otherUsersList}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;