import csrfFetch from './csrf';
import { storeCurrentUser, setSession, loginUser } from './session';
import { receiveSessionErrors } from './errors';


export const RECEIVE_USER = 'users/RECEIVE_USER';
export const REMOVE_USER = 'users/REMOVE_USER';
export const SEARCH_USERS = 'users/SEARCH_USERS';
export const RECEIVE_EXPERIENCE = 'users/RECEIVE_EXPERIENCE';
export const REMOVE_EXPERIENCE = 'users/REMOVE_EXPERIENCE';

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
};

export const searchUsers = (data) => {
    return {
        type: 'SEARCH_USERS',
        data
    }
};

export const receiveExperience = (experience) => {
    return {
        type: 'RECEIVE_EXPERIENCE',
        experience
    }
};

export const removeExperience = experienceId => {
    return {
        type: 'REMOVE_EXPERIENCE',
        experienceId
    }
}


// selector to get user object
// initially the 
export const getUser = state => state.user.user;

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
        // dispatch(receiveUser(data.user))
        dispatch(loginUser(data.user))
    } else {
        const data = await res.json();
        // data.errors => ex.['Email Please enter a valid email address.', 'error2']
        dispatch(receiveSessionErrors(data.errors))
    }

    return res;
}
export const updateUser = (user) => async (dispatch) => {
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
        dispatch(setSession(data.user));
        dispatch(receiveUser(data.user))
    }
    // else {
    //     const data = await res.json();
    // }

    return res;
}

export const updateUserPhoto = (id, formData) => async (dispatch) => {
    debugger
    const res = await csrfFetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        const user = data.user;
        // dispatch(receiveUser(user));
        dispatch(setSession(user));
        dispatch(receiveUser(user));
    }

    return res;
};


export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        const user = data.user;
        dispatch(receiveUser(user));
    }
}

export const fetchLikersData = (likerId) => async (dispatch) => {
    debugger
    const res = await csrfFetch(`/api/users/${likerId}?likers=true`);
    if (res.ok) {
        const data = await res.json();
        const user = data.user;
        return user;
    } else {
        debugger
        return null;
    }
}


export const fetchUsersSearch = (query) => async (dispatch) => {
    const res = await csrfFetch(`api/users/search?query=${query}`);
    const data = await res.json();
    dispatch(searchUsers(data));
    return data;
};

const initialState = {
    user: null,
    searchResults: []
}
const userReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user };
        case REMOVE_USER:
            return { ...state, user: null };
        case 'SEARCH_USERS':
            return { ...state, searchResults: action.data };
        case RECEIVE_EXPERIENCE:
            const experience = action.experience;
            const updatedUser = { ...state.user };
            updatedUser.experiences = { ...updatedUser.experiences, [experience.id]: experience };
            return { ...state, user: updatedUser };
        case REMOVE_EXPERIENCE:
        default:
            return state;
    }
}

export default userReducer
