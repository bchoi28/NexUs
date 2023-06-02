import csrfFetch from './csrf';
import { storeCurrentUser, setSession } from './session';
import { receiveSessionErrors } from './errors';


export const RECEIVE_USER = 'users/RECEIVE_USER'
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
export const getUser = (state) => {
    if (state.user.id) return state.user;
    else return null;
}

// thunk action creators
export const signupUser = (user) => async (dispatch) => {
    debugger
    const payload = { user: user }
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    debugger
    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setSession(data.user));
        dispatch(receiveUser(data.user))
    } else {
        const data = await res.json();
        // data.errors => ex.['Email Please enter a valid email address.', 'error2']
        dispatch(receiveSessionErrors(data.errors))
    }

    return res;
}
export const updateUser = (user) => async (dispatch) => {

    const payload = { user: user }
    const res = await csrfFetch(`/api/user/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const data = await res.json();

    } else {
        const data = await res.json();
    }

    return res;
}



const userReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        case REMOVE_USER:
            delete nextState.user;
            return nextState;
        default:
            return state;
    }
}

export default userReducer
