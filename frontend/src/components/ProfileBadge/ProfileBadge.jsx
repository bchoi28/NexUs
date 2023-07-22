import { useDispatch, useSelector } from 'react-redux';
import './ProfileBadge.css'
import { NavLink } from 'react-router-dom';
import { fetchSessionUser, getSessionUser } from '../../store/session';
import { getConnections } from '../../store/connection';

const ProfileBadge = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)
    const connections = Object.values(useSelector(getConnections));
    const connectionsCount = connections?.length;

    if (!currentUser) {
        return <h1>Loading User...</h1>
    }

    // if (!currentUser.coverPhotoUrl) {
    //     dispatch(fetchSessionUser(currentUser.id));
    //     return <p>...</p>
    // }


    return (
        <div className='profile-badge-container'>
            <img className='badge-background' src={currentUser.coverPhotoUrl ? currentUser.coverPhotoUrl : '/assets/images/seeds/badge-background.png'} alt="banner" />
            <div>
                <img className='badge-photo' src={currentUser.photoUrl ? currentUser.photoUrl : '/assets/images/seeds/default-profile-image-circle'} alt="profile" />
            </div>
            <div>
                <NavLink className='profile-badge-link' to={`/profile/${currentUser.id}`}>{currentUser.fName} {currentUser.lName}</NavLink>
            </div>
            <div>
                <div className='profile-badge-headline' >{currentUser.headline}</div>
            </div>
            <div className='profile-view-count'>
                <div>Who's viewed your profile</div>
                <div style={{ color: 'var(--primary-color)' }} >20</div>
            </div>
            <div className='profile-connections-count'>
                <NavLink to='/mynetwork' className='profile-badge-connections-link'>
                    <div>Alliances</div>
                </NavLink>
                <NavLink to='/mynetwork'>
                    <div style={{ color: 'var(--primary-color)' }} >{connectionsCount}</div>
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileBadge;