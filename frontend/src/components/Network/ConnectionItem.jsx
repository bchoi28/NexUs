import './ConnectionItem.css';
import { NavLink } from 'react-router-dom';

const ConnectionItem = ({ connection }) => {
    const user = connection.user;
    const userPhoto = user.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';
    return (
        <div className='profile-badge-container'>
            <img className='badge-background' src={user.coverPhotoUrl ? user.coverPhotoUrl : '/assets/images/seeds/badge-background.png'} alt="banner" />
            <div>
                <img className='badge-photo' src={user.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle'} alt="profile" />
            </div>
            <div>
                <NavLink className='profile-badge-link' to={`/profile/${user.id}`}>{user.fName} {user.lName}</NavLink>
            </div>
            <div>
                <div className='profile-badge-headline' >{user.headline}</div>
            </div>
        </div>
    )
}
export default ConnectionItem;