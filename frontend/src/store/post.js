import csrfFetch from "./csrf";

// regular action constants
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const REMOVE_POST = 'posts/REMOVE_POST';
export const REMOVE_POSTS = 'posts/REMOVE_POSTS';
export const RECEIVE_LIKE_POST = 'posts/RECEIVE_LIKE_POST';
export const REMOVE_LIKE_POST = 'posts/REMOVE_LIKE_POST';

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

export const receiveLikePost = (postId, likeId) => {
    const defaultUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUserId = defaultUser.id;

    return {
        type: RECEIVE_LIKE_POST,
        postId, likeId, currentUserId
    }
}

export const removeLikePost = (postId, likeId) => {
    return {
        type: REMOVE_LIKE_POST,
        postId, likeId
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
export const getLikeStatus = (postId) => state => {
    const currentUserId = state.session.user.id;
    if (state.posts[postId].likes) {
        const likes = Object.values(state.posts[postId].likes);
        return likes.some((like) => like.likerId === currentUserId)
    } else return false;
}

export const getLikeId = (postId) => state => {
    const currentUserId = state.session.user.id;
    if (state.posts[postId].likes) {
        const currentPostLikes = state.posts[postId].likes;
        const likeKeys = Object.keys(currentPostLikes);
        const currentUserLikeKey = likeKeys.find(likeId => currentPostLikes[likeId].likerId === currentUserId);
        return currentUserLikeKey || null;
    } else return null;
}

export const getLikeCount = postId => state => {
    if (state.posts[postId].likes) {
        const likeCount = Object.keys(state.posts[postId].likes).length;
        return likeCount;
    } else return null;
}

// thunk action creators
export const fetchPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        const posts = data.posts;
        dispatch(receivePosts(posts));
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

export const updatePost = (id, formData) => async (dispatch) => {
    // const payload = { post: post }
    const res = await csrfFetch(`/api/posts/${id}`, {
        method: 'PATCH',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // im already doing this in my custom csrfFetch
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
            const { postId, likeId, currentUserId } = action;
            return {
                ...state, [postId]: {
                    ...state[postId], likes: {
                        ...state[postId].likes, [likeId]: { likerId: currentUserId }
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
        default:
            return state;
    }
}

export default postsReducer;