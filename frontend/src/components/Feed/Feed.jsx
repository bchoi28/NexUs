import './Feed.css';
import FeedNavBar from '../FeedNavBar';
import ProfileBadge from '../ProfileBadge';
import PostIndex from '../PostIndex';
import PostForm from '../PostForm';
import { useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';
import ModalSwitch from '../Modal/ModalContainer/ModalSwitch';

const Feed = () => {

    // we need to pass these 2 in wherever we render ModalContainer
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

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
                    <div className='feed-post-form-container'>
                        <div className='feed-post-form-top'>
                            <img src="" alt="profile" />
                            <button className='feed-create-post-button' onClick={handleOpenModal}>Start a post</button>

                            {modalIsOpen &&
                                <ModalContainer
                                    isOpen={modalIsOpen}
                                    onRequestClose={handleCloseModal}
                                >
                                    <ModalSwitch modalType='post' handleClose={handleCloseModal} />
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