import './ConnectionRequestItem.css';
import { useState, useEffect } from 'react';
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
        const connection = { status: 'accepted' }
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
                <div>ignored</div>
            ) :
                accepted ? (
                    <div>accepted</div>
                ) : (
                    <div className='request-container'>
                        <img className='request-photo' src={connectorPhoto} alt="ally" />
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