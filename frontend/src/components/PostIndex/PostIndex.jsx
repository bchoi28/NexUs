import './PostIndex.css';
import { fetchPosts, getPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import PostItem from '../PostItem';
import { useState } from 'react';

const PostIndex = () => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const observerTarget = useRef(null);

    const posts = useSelector(getPosts);
    const reversedPosts = [...posts]?.reverse();
    const postItems = reversedPosts?.map(post => <PostItem key={post.id} post={post} />)
    // const postItems = posts.map(post => <PostItem key={post.id} post={post} />)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setIsLoading(true);

                dispatch(fetchPosts(page))
                    .then((hasMorePosts) => {
                        setIsLoading(false);
                        if (hasMorePosts) {
                            setPage(prevPage => prevPage + 1);
                        } else {
                            setHasMorePosts(false);
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                    });
            }
        }, { threshold: 0.5 });
        if (observerTarget.current) observer.observe(observerTarget.current);

        return () => observer.disconnect();
    }, [dispatch, page])

    return (
        <div className='post-items-container'>
            {postItems}
            <div className='observer' ref={observerTarget}></div>

            {isLoading && (
                <div className='loading-posts'>
                    <div className='loading-circle'></div>
                </div>
            )}

        </div >
    )
}

export default PostIndex;