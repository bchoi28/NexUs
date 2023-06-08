import csrfFetch from './csrf';
import { storeCurrentUser, setSession, loginUser } from './session';
import { receiveSessionErrors } from './errors';


export const RECEIVE_USER = 'users/RECEIVE_USER';
export const REMOVE_USER = 'users/REMOVE_USER';

// regular action creators

// receiveUser is for create, update
export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}
// removeUser is for delete
export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

// selector to get user object
export const getUser = state => state.user;

// thunk action creators
export const signupUser = (user) => async (dispatch) => {
    const payload = { user: user }
    // user: { email: 'demo@user.io', password: 'password' }
    // this way, the params object that the controller access
    // has a key of user pointing to this user object
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setSession(data.user));
        dispatch(receiveUser(data.user))
        dispatch(loginUser(data.user))
    } else {
        const data = await res.json();
        // data.errors => ex.['Email Please enter a valid email address.', 'error2']
        dispatch(receiveSessionErrors(data.errors))
    }

    return res;
}
export const updateUser = (user) => async (dispatch) => {
    debugger
    const payload = { user: user }
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data.user));
    } else {
        const data = await res.json();
    }

    return res;
}

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        const user = data.user;
        dispatch(receiveUser(user));
    }
}



const userReducer = (state = null, action) => {
    // const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        case REMOVE_USER:
            return null;
        default:
            return state;
    }
}

export default userReducer
