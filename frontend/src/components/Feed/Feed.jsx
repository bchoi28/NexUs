import './Feed.css';
import FeedNavBar from '../FeedNavBar';
import ProfileBadge from '../ProfileBadge';
import PostIndex from '../PostIndex';
import PostForm from '../PostForm';

const Feed = () => {


    return (
        <div className='feed-page-container'>

            <header className='feed-navbar-container'>
                <FeedNavBar />
            </header>
            <div className='feed-container'>

                <div className='feed-left'>
                    <ProfileBadge />
                </div>

                <div className='feed-middle'>
                    <div className='post-form-container'>
                        <PostForm />
                    </div>
                    <div className='post-index-container'>
                        <PostIndex />
                    </div>
                </div>

                <div className='feed-right'>

                </div>
            </div>

        </div>
    )
}

export default Feed;