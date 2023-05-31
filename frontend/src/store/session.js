import csrfFetch from './csrf';
import { receiveSessionErrors } from './errors';

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = (user) => {
    return {
        type: SET_SESSION,
        user
    };
};

export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}


// thunk action creator
export const loginUser = (user) => async (dispatch) => {
    const payload = { user: user }
    // debugger
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    // debugger

    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setSession(data.user));
    } else {
        const data = await res.json();
        dispatch(receiveSessionErrors(data.errors))
    }


    // if (res.ok) {
    //     const data = await res.json();
    //     storeCurrentUser(data.user);
    //     dispatch(setSession(data.user));
    // } else {
    //     const data = await res.json();
    //     dispatch(receiveSessionErrors(data.errors))
    // }

    return res;
}

export const logoutUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    storeCurrentUser(null);
    // sessionStorage.setItem('currentUser', null);
    dispatch(removeSession())

}

export const signup = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setSession(data.user));
    };

    return res;
}

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json()
    storeCurrentUser(data.user);
    dispatch(setSession(data.user));
    return res;
}

// helper methods for restoreSession
const storeCSRFToken = (res) => {
    const csrfToken = res.headers.get('X-CSRF-Token');
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
    else sessionStorage.removeItem('currentUser');
}





// sessionReducer

const defaultUser = JSON.parse(sessionStorage.getItem('currentUser'));

const sessionReducer = (initialState = { user: defaultUser }, action) => {
    Object.freeze(initialState);
    const nextState = { ...initialState };

    switch (action.type) {
        case SET_SESSION:
            return { ...nextState, user: action.user }
        // nextState['user'] = action.user;
        case REMOVE_SESSION:
            return { ...nextState, user: null }
        default:
            return initialState;
    }
}

export default sessionReducer;