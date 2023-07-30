import './ConnectionRequestItem.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateConnection } from '../../store/connection';

const ConnectionRequestItem = ({ connectionRequest, id }) => {
    const dispatch = useDispatch();
    const connector = connectionRequest.connector;
    const connectionId = id;
    const connectorPhoto = connector.photoUrl ? connector.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';
    const [accepted, setAccepted] = useState(false);
    const [ignored, setIgnored] = useState(false);

    const handleAccept = () => {

        const connection = { status: 'connected' }
        dispatch(updateConnection(connectionId, connection));
        setAccepted(true);
    }

    const handleIgnore = () => {
        const connection = { status: 'ignored' }
        dispatch(updateConnection(connectionId, connection));
        setIgnored(true);
    }

    return (
        <>
            {ignored ? (
                <div className='request-container'>
                    <NavLink to={`profile/${connector.id}`}><img className='request-photo' src={connectorPhoto} alt="profile" /></NavLink>
                    <div className='request-info'>
                        <div className='request-headline'>Alliance declined</div>
                    </div>
                </div>) :
                accepted ? (
                    <div className='request-container'>
                        <NavLink to={`profile/${connector.id}`}><img className='request-photo' src={connectorPhoto} alt="profile" /></NavLink>
                        <div className='request-info'>
                            <div className='request-headline'>You have formed an alliance with {connector.fName}!</div>
                        </div>
                    </div>
                ) : (
                    <div className='request-container'>
                        <NavLink to={`profile/${connector.id}`}><img className='request-photo' src={connectorPhoto} alt="ally" /></NavLink>
                        <div className='request-info'>
                            <NavLink to={`profile/${connector.id}`} className='request-names'>{connector.fName} {connector.lName}</NavLink>
                            <div className='request-headline'>{connector.headline}</div>
                        </div>
                        <div className='request-button-container'>
                            <button className='request-button-ignore' onClick={handleIgnore}>Ignore</button>
                            <button className='request-button-accept' onClick={handleAccept}>Accept</button>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default ConnectionRequestItem;