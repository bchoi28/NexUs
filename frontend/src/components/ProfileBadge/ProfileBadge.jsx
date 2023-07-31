import { useDispatch, useSelector } from 'react-redux';
import './ProfileBadge.css'
import { NavLink } from 'react-router-dom';
import { fetchSessionUser, getSessionUser } from '../../store/session';
import { fetchAllConnections, getConnections } from '../../store/connection';
import { useEffect } from 'react';
import Login from '../Login';

const ProfileBadge = ({ user }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)
    const connections = Object.values(useSelector(getConnections));
    const connectionsCount = connections?.length;

    useEffect(() => {
        if (!currentUser || !currentUser.photoUrl) {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            dispatch(fetchSessionUser(currentUser.id));
        }
        if (currentUser) {
            dispatch(fetchAllConnections());
        }
    }, [])

    if (!currentUser) {
        return (
            <div className='profile-badge-loading-container'>
                <div className='badge-loading-circle-container'>
                    <div className='badge-loading-circle'></div>
                </div>
            </div>
        )
    }
    const profilePhoto = currentUser.photoUrl;
    const coverPhoto = currentUser.coverPhotoUrl;

    return (
        <div className='profile-badge-container'>
            <img className='badge-background' src={coverPhoto ? coverPhoto : '/assets/images/seeds/badge-background.png'} alt="banner" />
            <NavLink to={`/profile/${currentUser.id}`}>
                <img className='badge-photo' src={profilePhoto ? profilePhoto : '/assets/images/seeds/default-profile-image-circle.png'} alt="profile" />
            </NavLink>
            <div>
                <NavLink className='profile-badge-link' to={`/profile/${currentUser.id}`}>{currentUser.fName} {currentUser.lName}</NavLink>
            </div>
            <div>
                <div className='profile-badge-headline' >{currentUser.headline}</div>
            </div>
            <div className='profile-view-count'>
                <div>Who's viewed your profile</div>
                <div style={{ color: 'var(--primary-color)' }} >{currentUser.id > 5 ? `0` : `18`}</div>
            </div>
            <div className='profile-connections-count'>
                <NavLink to='/mynetwork' className='profile-badge-connections-link'>
                    <div>Alliances</div>
                </NavLink>
                <NavLink to='/mynetwork'>
                    <div className='profile-badge-connections-number' style={{ color: 'var(--primary-color)' }} >{connectionsCount}</div>
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileBadge;