import './NetworkPage.css';
import FeedNavBar from '../FeedNavBar';

const NetworkPage = () => {
    return (
        <div className='profile-page-container'>
            <header className='feed-navbar-container'>
                <FeedNavBar />
            </header>
            <div className='network-main-container'>
                <div className='network-left-container'>
                    <div className='manage-network'>
                        <div className='manage-network-title'>Manage my network</div>
                        <div className='manage-network-item'><span>Alliances</span></div>
                        <div className='manage-network-item'><span>Contacts</span></div>
                        <div className='manage-network-item'><span>Following & Followers</span></div>
                        <div className='manage-network-item'><span>Groups</span></div>
                        <div className='manage-network-item'><span>Events</span></div>
                        <div className='manage-network-item'><span>Pages</span></div>
                        <div className='manage-network-item'><span>Newsletters</span></div>
                        <div className='manage-network-item'><span>Hashtags</span></div>
                    </div>
                </div>
                <div className='network-right-container'>
                    <div className='network-invitations-container'></div>
                    <div className='network-suggestions-container'></div>
                </div>
            </div>
        </div>
    )
}

export default NetworkPage;