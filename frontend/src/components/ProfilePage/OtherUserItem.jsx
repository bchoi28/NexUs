import { useDispatch, useSelector } from 'react-redux';
import './OtherUserItem.css';
import { NavLink } from 'react-router-dom';
import { createConnection, getConnections, getConnectionsConnectedPending } from '../../store/connection';
import { getSessionUser } from '../../store/session';

const OtherUserItem = ({ user }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    // const connections = Object.values(useSelector(getConnections));

    // const isConnected = connections?.some(connection => {
    //     return connection.user.id === userId;
    // });
    const connections = Object.values(useSelector(getConnectionsConnectedPending));
    const userId = user.id;
    const profilePhoto = user?.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    const handleConnect = () => {
        const connection = {
            status: 'pending',
            connector_id: currentUser.id,
            connectee_id: userId
        }
        dispatch(createConnection(connection))
    }

    // Find the connection object with the given user ID (either as connector or connectee)
    const userConnection = connections.find((connection) =>
        connection.connecteeId === userId || connection.connectorId === userId
    );

    let buttonContent;
    if (userConnection) {
        if (userConnection.status === 'connected') {
            buttonContent = (
                <button className='other-user-message-button'>
                    <i className="fa-solid fa-message"></i>
                    <span className='other-user-connect-button-text'>Message</span>
                    <span className='message-button-tooltip'>coming soon!</span>
                </button>
            );
        } else if (userConnection.status === 'pending') {
            buttonContent = (
                <button className='other-user-pending-button'>
                    <i class="fa-solid fa-clock"></i>
                    <span className='other-user-connect-button-text-connect'>Pending</span>
                </button>
            );
        }
    } else {
        buttonContent = (
            < button className='other-user-connect-button' onClick={handleConnect}>
                <i className="fa-solid fa-user-plus"></i>
                <span className='other-user-connect-button-text-connect'>Connect</span>
            </button>
        );
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
                            {user.pronouns ? (
                                <div className='other-user-pronouns'>{user.pronouns}</div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </NavLink>
                    <div className='other-user-headline'>{user.headline ? user.headline : ''}</div>
                    <div className='other-user-location'>{user.location.length > 3 ? user.location : ``}</div>
                    {buttonContent}
                </div>
            </div>
        </>
    )
}

export default OtherUserItem;