export const RECEIVE_FILE_CLICK = 'click/RECEIVE_FILE_CLICK';
export const REMOVE_FILE_CLICK = 'click/REMOVE_FILE_CLICK';

export const receiveFileClick = () => {
    return {
        type: RECEIVE_FILE_CLICK,
    }
}
export const removeFileClick = () => {
    return {
        type: REMOVE_FILE_CLICK,
    }
}

export const getFileClickStatus = state => {
    if (state.click) {
        return state.click;
    } else return null;
}

const clickReducer = (state = false, action) => {
    switch (action.type) {
        case RECEIVE_FILE_CLICK:
            return true;
        case REMOVE_FILE_CLICK:
            return false;
        default:
            return state;
    }
}

export default clickReducer;