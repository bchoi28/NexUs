import './ConnectionRequestItem.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ConnectionRequestItem = ({ connectionRequest }) => {
    const connector = connectionRequest.connector;
    const connectorPhoto = connector.photoUrl ? connector.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    return (
        <div className='request-container'>
            <img className='request-photo' src={connectorPhoto} alt="ally" />
            <div className='request-info'>
                <NavLink to={`profile/${connector.id}`} className='request-names'>{connector.fName} {connector.lName}</NavLink>
                <div className='request-headline'>{connector.headline}</div>
            </div>
            <div className='request-button-container'>
                <button className='request-button-ignore'>Ignore</button>
                <button className='request-button-accept'>Accept</button>
            </div>
        </div>
    )
}

export default ConnectionRequestItem;