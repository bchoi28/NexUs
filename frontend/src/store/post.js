import csrfFetch from "./csrf";

// regular action constants
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const REMOVE_POST = 'posts/REMOVE_POST';
export const REMOVE_POSTS = 'posts/REMOVE_POSTS';
export const RECEIVE_LIKE_POST = 'posts/RECEIVE_LIKE_POST';
export const REMOVE_LIKE_POST = 'posts/REMOVE_LIKE_POST';
export const RECEIVE_COMMENT_POST = 'posts/RECEIVE_COMMENT_POST';
export const REMOVE_COMMENT_POST = 'posts/REMOVE_COMMENT_POST';


// regular action creators
export const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post: post
    }
};
export const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts: posts
    }
};

export const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId: postId
    }
};

export const removePosts = () => {
    return {
        type: REMOVE_POSTS,
    }
}

export const receiveLikePost = (postId, likeId, currentUserId, liker) => {
    return {
        type: RECEIVE_LIKE_POST,
        postId, likeId, currentUserId, liker
    }
}

export const removeLikePost = (postId, likeId) => {
    return {
        type: REMOVE_LIKE_POST,
        postId, likeId
    }
}

export const receiveCommentPost = (postId, commentId, comment) => {
    return {
        type: RECEIVE_COMMENT_POST,
        postId, commentId, comment
    }
}

export const removeCommentPost = (postId, commentId) => {
    return {
        type: REMOVE_COMMENT_POST,
        postId, commentId
    }
}


// getPost/getPosts selectors
export const getPost = postId => state => {
    if (state.posts) {
        return state.posts[postId];
    } else return null;
}

export const getPosts = state => {
    if (state.posts) {
        return Object.values(state.posts);
    } else return [];
}

// like selectors
export const getLikeStatus = (postId, currentUserId) => state => {
    if (state.posts[postId].likes) {
        const likes = Object.values(state.posts[postId].likes);
        return likes.some((like) => like.likerId === currentUserId)
    } else return false;
}

export const getLikeId = (postId, currentUserId) => state => {
    if (state.posts[postId].likes) {
        const currentPostLikes = state.posts[postId].likes;
        const likeKeys = Object.keys(currentPostLikes);
        const currentUserLikeKey = likeKeys.find(likeId => currentPostLikes[likeId].likerId === currentUserId);
        return currentUserLikeKey || null;
    } else return null;
}

export const getLikeInformation = postId => state => {
    if (state.posts[postId].likes) {

        const likes = Object.values(state.posts[postId].likes);
        const likeCount = likes.length;
        const likers = likes.map(like => like.liker);

        const likeInformation = {
            likes, likeCount, likers
        }

        return likeInformation;
    } else return null;
}

// export const getLikeCount = postId => state => {
//     if (state.posts[postId].likes) {
//         const likeCount = Object.keys(state.posts[postId].likes).length;
//         return likeCount;
//     } else return null;
// }

// export const getLikes = postId => state => {
//     if (state.posts[postId].likes) {
//         const likes = Object.values(state.posts[postId].likes);
//         return likes;
//     } else return null;
// }

// export const getLikers = postId => state => {
//     if (state.posts[postId].likes) {
//         const likes = Object.values(state.posts[postId].likes);
//         const likers = likes.map(like => like.liker);
//         return likers;
//     } else return null;
// }

export const getCommentCount = postId => state => {
    if (state.posts[postId].comments) {
        const comments = Object.keys(state.posts[postId].comments);
        const commentCount = comments.length;
        return commentCount;
    } else return null;
}
export const getComments = postId => state => {
    if (state.posts[postId].comments) {
        const comments = Object.values(state.posts[postId].comments);
        return comments;
    } else return null;
}

export const getCommentInformation = postId => state => {
    if (state.posts[postId].comments) {

        const comments = Object.values(state.posts[postId].comments);
        const commentCount = comments.length;
        const commenters = comments.map(comment => comment.commenter);

        const commentInformation = {
            comments, commentCount, commenters
        }

        return commentInformation;
    } else return null;
}

// thunk action creators
export const fetchPosts = () => async (dispatch) => {
    debugger
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        const posts = data.posts;
        dispatch(receivePosts(posts));
        debugger
        // receivePosts([ {postObj1}, {postObj2}, ...] )
    }
};

// fetches posts for the currently displayed user/profile
export const fetchUserPosts = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/posts`)
    if (res.ok) {
        const data = await res.json();
        const posts = data.posts;
        dispatch(receivePosts(posts));
    }
}

export const fetchPost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    if (res.ok) {
        const data = await res.json();
        const post = data.post;
        dispatch(receivePost(post));
    }
};

export const createPost = (formData) => async (dispatch) => {
    // const payload = { post: post }
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        // body: JSON.stringify(payload)
        body: formData
    });
    if (res.ok) {
        const data = await res.json();
        const post = data.post;
        dispatch(receivePost(post))
    }
};

export const updatePost = (id, formData, removePhoto) => async (dispatch) => {
    // const payload = { post: post }
    const queryParams = removePhoto ? '?remove_photo=true' : '';
    const res = await csrfFetch(`/api/posts/${id}/${queryParams}`, {
        method: 'PATCH',
        body: formData
    });
    if (res.ok) {
        const data = await res.json();
        const post = data.post;
        dispatch(receivePost(post))
    }
};

export const deletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    // const post = await res.json();
    if (res.ok) {
        dispatch(removePost(postId))
    }
};

// postsReducer
const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts };
        case RECEIVE_POST:
            return { ...state, [action.post.id]: action.post };
        case REMOVE_POST:
            const newState = { ...state };
            delete newState[action.postId];
            return newState;
        case REMOVE_POSTS:
            return {};
        case RECEIVE_LIKE_POST:
            const { postId, likeId, currentUserId, liker } = action;
            return {
                ...state, [postId]: {
                    ...state[postId], likes: {
                        ...state[postId].likes, [likeId]: { likerId: currentUserId, liker: liker }
                    }
                }
            }
        case REMOVE_LIKE_POST:
            // const { postId, likeId } = action;
            const updatedLikes = { ...state[action.postId].likes };
            delete updatedLikes[action.likeId];
            return {
                ...state, [action.postId]: {
                    ...state[action.postId], likes: updatedLikes
                }
            };
        case RECEIVE_COMMENT_POST:
            // const { commentPostId, commentId, comment } = action;
            const comments = state[action.postId].comments || {};
            return {
                ...state, [action.postId]: {
                    ...state[action.postId], comments: {
                        ...comments, [action.commentId]: action.comment
                    }
                }
            };
        case REMOVE_COMMENT_POST:
            const updatedComments = { ...state[action.postId].comments };
            delete updatedComments[action.commentId];
            return {
                ...state, [action.postId]: {
                    ...state[action.postId], comments: updatedComments
                }
            };
        default:
            return state;
    }
}

export default postsReducer;