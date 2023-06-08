import { useSelector } from 'react-redux';
import './ProfileBadge.css'
import { NavLink } from 'react-router-dom';
import { getUser } from '../../store/user';

const ProfileBadge = () => {

    const currentUser = useSelector(getUser);

    if (!currentUser) {
        return <h1>Loading User...</h1>
    }

    return (
        <div className='profile-badge-container'>
            <img className='badge-background' src="https://nexus-seeds.s3.amazonaws.com/nexus-images/badge-background.png" alt="banner" />
            <div>
                <img className='badge-photo' src={currentUser.photoUrl} alt="" />
            </div>
            <div>
                <NavLink className='profile-badge-link' to='/profile'>{currentUser.fName} {currentUser.lName}</NavLink>
            </div>
            <div>
                <div className='profile-badge-headline' >{currentUser.headline}</div>
            </div>
            <div className='profile-view-count'>
                <div>Who's viewed your profile</div>
                <div style={{ color: 'var(--primary-color)' }} >20</div>
            </div>
            <div className='profile-connections-count'>
                <div>Connections</div>
                <div style={{ color: 'var(--primary-color)' }} >630</div>
            </div>
        </div>
    )
}

export default ProfileBadge;