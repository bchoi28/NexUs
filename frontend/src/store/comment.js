import csrfFetch from "./csrf";
import { receiveCommentPost, removeCommentPost } from "./post";

export const createCommentPost = (postId, currentUserId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}/comments`, {
        method: 'POST'
    });
    if (res.ok) {
        const data = await res.json();
        const commentId = parseInt(Object.keys(data.comment)[0]);
        const commenter = data.comment[commentId].commenter;
        dispatch(receiveCommentPost(postId, commentId, currentUserId, commenter));
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