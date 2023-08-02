import csrfFetch from './csrf';
import { receiveSessionErrors } from './errors';
import { removeUser } from './user';
import { removePosts } from './post';
import { loginSuccess, logoutSuccess } from './ui';

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = (user) => {
    return {
        type: SET_SESSION,
        user: user
    };
};

export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}

// selector to get sessionUser object
export const getSessionUser = state => state.session.user;

// thunk action creator
export const fetchSessionUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        const user = data.user;
        dispatch(setSession(user));
        // dispatch(notLoading());
    }
}

export const loginUser = (user) => async (dispatch) => {
    const payload = { user: user }
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(setSession(data.user));
        storeCurrentUser(data.user);
        dispatch(loginSuccess());
    } else {
        const data = await res.json();
        dispatch(receiveSessionErrors(data.errors))
    }
    return res;
}

export const logoutUser = () => async (dispatch) => {
    await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    storeCurrentUser(null);
    dispatch(removeSession());
    dispatch(removeUser());
    dispatch(removePosts());
    dispatch(logoutSuccess())
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

export const storeCurrentUser = (user) => {
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
        case REMOVE_SESSION:
            return { ...nextState, user: null }
        default:
            return initialState;
    }
}

export default sessionReducer;