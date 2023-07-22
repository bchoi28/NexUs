import csrfFetch from "./csrf";

export const RECEIVE_CONNECTIONS = 'connections/RECEIVE_CONNECTIONS';
export const RECEIVE_CONNECTIONS_CONNECTED_PENDING = 'connections/RECEIVE_CONNECTIONS_CONNECTED_PENDING';
export const REMOVE_CONNECTIONS = 'connections/REMOVE_CONNECTIONS';
export const RECEIVE_CONNECTION_REQUESTS = 'connections/RECEIVE_CONNECTION_REQUESTS';

export const receiveConnections = (connections) => {
    return {
        type: RECEIVE_CONNECTIONS,
        connections
    };
};

export const receiveConnectionsConnectedPending = (connections) => {
    return {
        type: RECEIVE_CONNECTIONS_CONNECTED_PENDING,
        connections
    };
};

export const receiveConnectionRequests = (connectionRequests) => {
    return {
        type: RECEIVE_CONNECTION_REQUESTS,
        connectionRequests
    };
};

export const removeConnections = () => {
    return {
        type: REMOVE_CONNECTIONS
    }
}

export const getConnectionRequests = state => state.connections.connectionRequests
export const getConnections = state => state.connections.connections
export const getConnectionsConnectedPending = state => state.connections.connectionsConnectedPending;

export const fetchAllConnections = () => async dispatch => {
    const res = await csrfFetch('/api/connections');
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveConnections(data.connections));
    }
};

export const fetchAllUserConnections = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/fetch_user_connections`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveConnections(data.connections));
    }
};

export const fetchAllUserConnectionsConnectedPending = () => async dispatch => {
    debugger
    const res = await csrfFetch('/api/connections/fetch_user_connections_connected_pending');
    if (res.ok) {
        debugger
        const data = await res.json();
        dispatch(receiveConnectionsConnectedPending(data.connections));
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
    connectionRequests: {},
    connectionsConnectedPending: []
}

const connectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case RECEIVE_CONNECTION:
        //     return { ...state.connections, ...state.connections[connection] }
        case RECEIVE_CONNECTIONS:
            return { ...state, connections: action.connections };
        case RECEIVE_CONNECTIONS_CONNECTED_PENDING:
            return { ...state, connectionsConnectedPending: action.connections };
        case REMOVE_CONNECTIONS:
            return { ...state, connections: [] }
        case RECEIVE_CONNECTION_REQUESTS:
            return { ...state, connectionRequests: action.connectionRequests };
        default:
            return state;
    }
}

export default connectionsReducer;