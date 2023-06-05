
// import csrfFetch from "./csrf";

export const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'session/REMOVE_SESSION_ERRORS';

export const receiveSessionErrors = (errors) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}
export const removeSessionErrors = () => {
    return {
        type: REMOVE_SESSION_ERRORS
    }
}


const initialState = {};
const errorsReducer = (state = initialState, action) => {
    // debugger
    // const newState = { ...state };
    // debugger
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors
        case REMOVE_SESSION_ERRORS:
            // debugger
            return {}
        default:
            return state;
    }
}

export default errorsReducer;
