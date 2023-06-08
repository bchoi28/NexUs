export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL'

export const openModal = (modalType, modalProps = {}) => {
    return {
        type: 'OPEN_MODAL',
        modalType,
        modalProps
    };
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    };
}

export const getModalInfo = (state) => state.modal;

// initial state
const initialState = {
    modalType: null,
    modalProps: {}
};

// reducer
const modalReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case 'CLOSE_MODAL':
            return initialState;
        default:
            return state;
    }
}

export default modalReducer;