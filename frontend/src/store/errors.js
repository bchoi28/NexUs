
// import csrfFetch from "./csrf";

export const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'session/REMOVE_SESSION_ERRORS';

export const receiveSessionErrors = ({ email, password }) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        email, password
    }
}
export const removeSessionErrors = () => {
    return {
        type: REMOVE_SESSION_ERRORS
    }
}


const initialState = {};
const errorsReducer = (state = initialState, action) => {
    const newState = { ...state };
    // debugger
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return { ...newState, email: action.email, password: action.password }
        case REMOVE_SESSION_ERRORS:
            return { ...newState }
        default:
            return state;
    }
}

export default errorsReducer;
