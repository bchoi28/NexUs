import csrfFetch from "./csrf";
import { receiveCommentPost, removeCommentPost } from "./post";

export const createCommentPost = (comment, postId) => async dispatch => {
    debugger
    const res = await csrfFetch(`api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment)
    });
    if (res.ok) {
        const data = await res.json();
        const commentId = parseInt(Object.keys(data.comment)[0]);
        const comment = data.comment[commentId];
        dispatch(receiveCommentPost(postId, commentId, comment));
    }
}

export const updateCommentPost = (comment, postId, commentId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify(comment)
    });
    if (res.ok) {
        const data = await res.json();
        const commentId = parseInt(Object.keys(data.comment)[0]);
        const comment = data.comment[commentId];
        dispatch(receiveCommentPost(postId, commentId, comment));
    }
}

export const deleteCommentPost = (postId, commentId) => async (dispatch) => {
    debugger
    const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeCommentPost(postId, commentId));
    }
}