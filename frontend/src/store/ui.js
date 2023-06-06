
export const LOGIN_REQUEST = 'ui/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'ui/LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'ui/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'ui/LOGOUT_SUCCESS';

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}
export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}
export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
}
export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const getUiState = state => state.ui.loading;

const initialState = { loading: false };
const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true }
        case LOGIN_SUCCESS:
            return { loading: false }
        case LOGOUT_REQUEST:
            return { loading: true }
        case LOGOUT_SUCCESS:
            return { loading: false }
        default:
            return state;
    }
}

export default uiReducer;