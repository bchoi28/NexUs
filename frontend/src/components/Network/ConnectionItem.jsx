import './ConnectionItem.css';
import { NavLink } from 'react-router-dom';

const ConnectionItem = ({ connection }) => {
    const user = connection.user;
    return (
        <div className='connection-item-container'>
            <div className='connection-badge'>
                <img className='badge-background' src={user.coverPhotoUrl ? user.coverPhotoUrl : '/assets/images/seeds/badge-background.png'} alt="banner" />
                <div>
                    <NavLink to={`profile/${user.id}`} ><img className='connection-badge-photo' src={user.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle.png'} alt="profile" /></NavLink>
                </div>
                <NavLink to={`/profile/${user.id}`}>
                    <div className='connection-profile-badge-link' >{user.fName} {user.lName}</div>
                </NavLink>
                <div>
                    <div className='connection-profile-badge-headline' >{user.headline}</div>
                </div>
                <div className='connection-location'>{user.location.length > 2 ? user.location : ''}</div>
            </div>
        </div>
    )
}
export default ConnectionItem;