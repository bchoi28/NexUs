import csrfFetch from './csrf'
import { receiveLikePost, removeLikePost } from './post';

// thunk action creators
export const createLikePost = (postId, currentUserId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: 'POST'
    });
    if (res.ok) {
        const data = await res.json();
        const likeId = parseInt(Object.keys(data.like)[0]);
        const liker = data.like[likeId].liker;
        dispatch(receiveLikePost(postId, likeId, currentUserId, liker))
    }
}

export const deleteLikePost = (postId, likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/${likeId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeLikePost(postId, likeId));
    }
}