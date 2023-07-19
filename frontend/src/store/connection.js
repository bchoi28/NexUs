import csrfFetch from "./csrf";

export const fetchAllConnectionRequests = () => async dispatch => {
    const res = await csrfFetch('/api/connections?pending=true');
    if (res.ok) {
        const data = await res.json();
        // dispatch(receiveConnectionRequests(data.connection_invitations));
        // dispatch(receiveUsers(data.users)); // Assuming you also receive user information
    }
};


export const createConnection = connection => async dispatch => {
    const res = await csrfFetch('/api/connections', {
        method: 'POST',
        body: JSON.stringify({ connection: connection })
    });

    if (res.ok) {
        const data = await res.json();
        // dispatch(receiveConnection(data.connection));
    }
};

export const updateConnection = (connectionId, connection) => async dispatch => {
    const res = await csrfFetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ connection: connection })
    });

    if (res.ok) {
        const data = await res.json();
        // dispatch(receiveConnection(data.connection));
    }
};

export const deleteConnection = connectionId => async dispatch => {
    const res = await csrfFetch(`/api/connections/${connectionId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        // dispatch(removeConnection(connectionId));
    }
};
