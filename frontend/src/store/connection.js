import csrfFetch from "./csrf";

export const RECEIVE_CONNECTIONS = 'connections/RECEIVE_CONNECTIONS';
export const RECEIVE_CONNECTION_REQUESTS = 'connections/RECEIVE_CONNECTION_REQUESTS';

export const receiveConnections = (connections) => {
    return {
        type: RECEIVE_CONNECTIONS,
        connections
    };
};

export const receiveConnectionRequests = (connectionRequests) => {
    return {
        type: RECEIVE_CONNECTION_REQUESTS,
        connectionRequests
    };
};

export const getConnectionRequests = state => state.connections.connectionRequests
export const getConnections = state => state.connections.connections

export const fetchAllConnections = () => async dispatch => {
    const res = await csrfFetch('/api/connections');
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveConnections(data.connections));
    }
};

export const fetchAllConnectionRequests = () => async dispatch => {
    const res = await csrfFetch('/api/connections?pending=true');
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveConnectionRequests(data.connectionRequests));
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
    debugger
    const res = await csrfFetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ connection: connection })
    });

    if (res.ok) {
        debugger
        const data = await res.json();
        dispatch(receiveConnections(data.connections));
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

const initialState = {
    connections: [],
    connectionRequests: []
}

const connectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CONNECTIONS:
            return { ...state, connections: action.connections };
        case RECEIVE_CONNECTION_REQUESTS:
            return { ...state, connectionRequests: action.connectionRequests };
        default:
            return state;
    }
}

export default connectionsReducer;