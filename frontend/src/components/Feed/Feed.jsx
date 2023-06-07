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

    const dispatch = useDispatch();

    // we need to pass these 2 in wherever we render ModalContainer
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const currentUser = useSelector(getUser);

    if (!currentUser) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const userId = currentUser?.id;
        if (userId) {
            dispatch(fetchUser(userId));
        }
        return <h1>Loading...</h1>;
    }

    // useEffect(() => {
    //     const user = JSON.parse(sessionStorage.getItem('currentUser'));
    //     const userId = user.id;
    //     dispatch(fetchUser(userId));
    // }, [])

    // if (!user) {
    //     return <h1>loading</h1>
    // }

    return (
        <div className='feed-page-container'>

            <header className='feed-navbar-container'>
                <FeedNavBar currentUser={currentUser} />
            </header>
            <div className='feed-container'>

                <div className='feed-left'>
                    {currentUser ? <ProfileBadge /> : null}
                </div>

                <div className='feed-middle'>
                    <div className='feed-post-form-container'>
                        <div className='feed-post-form-top'>
                            {currentUser && <img className='feed-user-profile-pic' src={currentUser.photoUrl} alt="profile" />}
                            <button className='feed-create-post-button' onClick={handleOpenModal}>Start a post</button>

                            {modalIsOpen &&
                                <ModalContainer
                                    isOpen={modalIsOpen}
                                    onRequestClose={handleCloseModal}
                                >
                                    <ModalSwitch modalType='createPost' handleClose={handleCloseModal} currentUser={currentUser} />
                                </ModalContainer>
                            }

                        </div>
                        <div className='feed-post-form-bottom' >
                            <i class="fa-regular fa-image"></i>
                            <i class="fa-solid fa-video"></i>
                            <i class="fa-regular fa-calendar-plus"></i>
                            <i class="fa-solid fa-newspaper"></i>
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