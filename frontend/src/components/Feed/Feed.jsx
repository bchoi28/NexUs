import './Feed.css';
import FeedNavBar from '../FeedNavBar';
import ProfileBadge from '../ProfileBadge';
import PostIndex from '../PostIndex';
import PostForm from '../PostForm';
import { useEffect, useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/user';
import { fetchUser } from '../../store/user';

const Feed = () => {
    debugger

    const dispatch = useDispatch();

    // we need to pass these 2 in wherever we render ModalContainer
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const user = useSelector(getUser);

    useEffect(() => {
        // debugger
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        const userId = user.id;
        dispatch(fetchUser(userId));
    }, [])

    // debugger
    return (
        <div className='feed-page-container'>

            <header className='feed-navbar-container'>
                <FeedNavBar />
            </header>
            <div className='feed-container'>

                <div className='feed-left'>
                    {user ? <ProfileBadge /> : null}
                </div>

                <div className='feed-middle'>
                    <div className='feed-post-form-container'>
                        <div className='feed-post-form-top'>
                            {user && <img src='' alt="profile" />}
                            <button className='feed-create-post-button' onClick={handleOpenModal}>Start a post</button>

                            {modalIsOpen &&
                                <ModalContainer
                                    isOpen={modalIsOpen}
                                    onRequestClose={handleCloseModal}
                                >
                                    <ModalSwitch modalType='createPost' handleClose={handleCloseModal} />
                                </ModalContainer>
                            }

                        </div>
                        <div className='feed-post-form-bottom' >
                            photo video
                        </div>

                        {/* <PostForm /> */}
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