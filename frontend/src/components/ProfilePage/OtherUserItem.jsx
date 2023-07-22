import { useDispatch, useSelector } from 'react-redux';
import './OtherUserItem.css';
import { NavLink } from 'react-router-dom';
import { createConnection, getConnections, getConnectionsConnectedPending } from '../../store/connection';

const OtherUserItem = ({ user }) => {

    const dispatch = useDispatch();
    // const connections = Object.values(useSelector(getConnections));
    const connections = Object.values(getConnectionsConnectedPending)
    const userId = user.id
    const isConnected = connections?.some(connection => {
        return connection.user.id === userId;
    });
    const profilePhoto = user?.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle';

    const handleConnect = () => {
        const connection = { status: 'pending' }
        dispatch(createConnection(connection))
    }

    return (
        <>
            <div className='other-user-container'>
                <NavLink className='other-user-link' to={`/profile/${user.id}`}>
                    <img className='other-user-photo' src={profilePhoto} alt="profile" />
                </NavLink>
                <div className='other-user-info'>
                    <NavLink className='other-user-link' to={`/profile/${user.id}`} >
                        <div className='other-user-names-pronouns'>
                            <div className='other-user-names'>{user.fName} {user.lName}</div>
                            <div className='other-user-pronouns'>{user.pronouns}</div>
                        </div>
                    </NavLink>
                    <div className='other-user-headline'>{user.headline}</div>
                    <div className='other-user-location'>{user.location}</div>
                    {isConnected ? (
                        <button className='other-user-message-button'>
                            <i className="fa-solid fa-message"></i>
                            <span className='other-user-connect-button-text'>Message</span>
                            <span className='message-button-tooltip'>coming soon!</span>
                        </button>
                    ) : (
                        <button className='other-user-connect-button' onClick={handleConnect}>
                            <i className="fa-solid fa-user-plus"></i>
                            <span className='other-user-connect-button-text'>Connect</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default OtherUserItem;