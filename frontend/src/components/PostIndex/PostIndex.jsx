import './PostIndex.css';
import { fetchPosts, getPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostItem from '../PostItem';

const PostIndex = () => {
    debugger

    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    // const reversedPosts = [...posts].reverse();

    debugger
    // const postItems = posts.reverse().map(post => <PostItem key={post.id} post={post} />)
    const postItems = posts.reverse().map(post => <PostItem key={post.id} post={post} />)

    useEffect(() => {
        // debugger
        dispatch(fetchPosts());
    }, [dispatch])


    return (
        <div className='post-items-container'>
            {postItems}
        </div>
    )
}

export default PostIndex;