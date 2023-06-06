import csrfFetch from "./csrf";

// regular action constants
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const REMOVE_POST = 'posts/REMOVE_POST';
export const REMOVE_POSTS = 'posts/REMOVE_POSTS'

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

// getPost/getPosts selector functions
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

export const createPost = (post) => async (dispatch) => {
    // const payload = { post: post }
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        // body: JSON.stringify(payload)
        body: post
    });
    if (res.ok) {
        const data = await res.json();
        const post = data.post;
        dispatch(receivePost(post))
    }
};

export const updatePost = (post) => async (dispatch) => {
    const payload = { post: post }
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // im already doing this in my custom csrfFetch
        body: JSON.stringify(payload)
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
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...nextState, ...action.posts };
        case RECEIVE_POST:
            nextState[action.post.id] = action.post;
            return nextState
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        case REMOVE_POSTS:
            return {};
        default:
            return state;
    }
}

export default postsReducer;