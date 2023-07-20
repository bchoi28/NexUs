import './ConnectionRequestItem';
import { useState, useEffect } from 'react';

const ConnectionRequestItem = (connectionRequest) => {
    const connector = connectionRequest.connector;
    const connectorPhoto = connector.photoUrl ? connector.photoUrl : '/assets/images/seeds/default-profile-image-circle.png';

    return (
        <div key={connector.id}>
            <img src={connectorPhoto} alt="ally" />
            <div>{connector.fName}</div>
            <div>{connector.lName}</div>
            <div>{connector.headline}</div>
            <div>{connector.pronouns}</div>
        </div>
    )
}

export default ConnectionRequestItem;