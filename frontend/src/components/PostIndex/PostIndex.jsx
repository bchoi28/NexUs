import './PostIndex.css';
import { fetchPosts, getPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostItem from '../PostItem';

const PostIndex = () => {

    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    const reversedPosts = [...posts].reverse();
    const postItems = reversedPosts.map(post => <PostItem key={post.id} post={post} />)

    // const postItems = posts.reverse().map(post => <PostItem key={post.id} post={post} />)
    // const postItems = posts.reverse().map(post => <PostItem key={post.id} post={post} />)

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    if (posts.length === 0) {
        return <div className='loading-posts'>loading posts...</div>
    }

    return (
        <div className='post-items-container'>
            {postItems}
        </div>
    )
}

export default PostIndex;