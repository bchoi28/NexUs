import csrfFetch from './csrf'

export const LIKE_CREATED = 'likes/LIKE_CREATED';
export const LIKE_DELETED = 'likes/LIKE_DELETED';

export const likeCreated = (postId, likeId) => {
    return {
        type: LIKE_CREATED,
        postId, likeId
    }
}
export const likeDeleted = (postId) => {
    return {
        type: LIKE_DELETED,
        postId
    }
}

// like useSelectors
export const getLikeStatus = (postId) => state => {
    if (state.like.postLikes) {
        return state.like.postLikes?.[postId]?.liked;
    } else return null;
}
export const getLikeId = (postId) => state => {
    if (state.like.postLikes) {
        return state.like.postLikes?.[postId]?.likeId;
    } else return null;
}

// thunk action creators
export const createLikeFetch = (postId) => async (dispatch) => {

    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: 'POST'
    });
    if (res.ok) {

        const data = await res.json();
        dispatch(likeCreated(postId, data.likeId));
    }
}

export const deleteLikeFetch = (postId, likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/${likeId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(likeDeleted(postId));
    }
}

const initialState = {
    postLikes: {},
};
const likeReducer = (state = initialState, action) => {

    switch (action.type) {
        case LIKE_CREATED:
            return {
                ...state,
                postLikes: {
                    ...state.postLikes,
                    [action.postId]: {
                        liked: true,
                        likeId: action.likeId,
                    },
                },
            };

        case LIKE_DELETED:
            return {
                ...state,
                postLikes: {
                    ...state.postLikes,
                    [action.postId]: {
                        liked: false,
                        likeId: null,
                    },
                },
            };


        default:
            return state;
    }
};

export default likeReducer;