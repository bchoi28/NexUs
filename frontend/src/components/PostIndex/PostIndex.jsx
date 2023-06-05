import './PostIndex.css';
import { fetchPosts, getPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostItem from '../PostItem';

const PostIndex = () => {

    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    let postItems;
    if (posts.length > 0) {
        postItems = posts.map(post => <PostItem key={post.id} post={post} />)
    } else {
        postItems = <p>Loading posts...</p>
    }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    return (
        <div className='post-items-container'>
            {postItems}
        </div>
    )
}

export default PostIndex;