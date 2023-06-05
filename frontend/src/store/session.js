import csrfFetch from './csrf';
import { receiveSessionErrors } from './errors';
import { receiveUser, removeUser } from './user';

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = (userData) => {
    let user = null;
    if (userData) {
        const { id, email, fName, lName } = userData;
        user = { id, email, fName, lName };
    }
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
        debugger
        const data = await res.json();
        // right here it triggers a re-render 
        // of my SplashSignInForm???
        dispatch(setSession(data.user));
        dispatch(receiveUser(data.user));
        storeCurrentUser(data.user);
        // debugger
    } else {
        debugger
        const data = await res.json();
        debugger
        dispatch(receiveSessionErrors(data.errors))
        // receiveSessionErrors(['error', null]) receives an array of errors
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
    await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    storeCurrentUser(null);
    // sessionStorage.setItem('currentUser', null);
    dispatch(removeSession());
    dispatch(removeUser());


}
// i moved this to user.js

// export const signup = (user) => async (dispatch) => {

//     const payload = { user: user }
//     const res = await csrfFetch('/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     // debugger
//     if (res.ok) {
//         const data = await res.json();
//         storeCurrentUser(data.user);
//         dispatch(setSession(data.user));
//     } else {
//         const data = await res.json();
//         // debugger
//         // data.errors => ex.['Email Please enter a valid email address.', 'error2']
//         dispatch(receiveSessionErrors(data.errors))
//     }

//     return res;
// }

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    // debugger
    storeCSRFToken(res);
    const data = await res.json()
    storeCurrentUser(data.user);
    dispatch(setSession(data.user));
    return res;
}

// helper methods for restoreSession
const storeCSRFToken = (res) => {
    debugger
    const csrfToken = res.headers.get('X-CSRF-Token');
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export const storeCurrentUser = (user) => {
    // debugger
    if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
    else sessionStorage.removeItem('currentUser');
    // if you pass in null, it removes the key currentUser entirely
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