import './FeedNavBar.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSessionUser } from '../../store/session';
import ProfileDropDown from './ProfileDropDown';
import SearchBar from '../SearchBar/SearchBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAllConnectionRequests, getConnectionRequests } from '../../store/connection';
import { useEffect } from 'react';

const FeedNavBar = () => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    const connectionRequests = useSelector(getConnectionRequests);
    const values = connectionRequests ? Object.values(connectionRequests) : null;
    const connectionRequestsCount = values?.length;
    const isFeedPage = location.pathname === '/feed';
    const isNetworkPage = location.pathname === '/mynetwork';

    const handleHomeClick = () => {
        if (location.pathname === '/feed') {
            history.go(0);
        } else {
            history.push('/feed');
        }
    };

    const handleNetworkClick = () => {
        if (location.pathname === '/mynetwork') {
            history.go(0);
        } else {
            history.push('/mynetwork');
        }
    };

    useEffect(() => {
        if (currentUser) dispatch(fetchAllConnectionRequests())
    }, [])

    return (
        <div className='main-nav-container-full'>
            <div className='main-nav-container'>

                <div className='left-main-nav'>
                    <div className='feed-nav-logo-us' onClick={handleHomeClick}>us</div>
                    <SearchBar />
                </div>

                <div className='right-main-nav'>

                    <div className={`icon-container-home ${isFeedPage ? 'active' : ''}`} onClick={handleHomeClick}>
                        <i className="fa-solid fa-house main-nav-icons home-icon"></i>
                        <span className="icon-text">Home</span>
                    </div>
                    <div className={`icon-container ${isNetworkPage ? 'active' : ''}`} onClick={handleNetworkClick} >
                        <i className="fa-solid fa-user-group main-nav-icons"></i>
                        {/* <i className="fa-solid fa-people-group main-nav-icons"></i> */}
                        <span className="icon-text">My Network</span>
                        {connectionRequestsCount > 0 && <span className='connections-request-count-notification'>{connectionRequestsCount}</span>}
                    </div>
                    <div className="icon-container-messaging">
                        <i className="fa-solid fa-comment-dots fa-flip-horizontal main-nav-icons"></i>
                        <span className="icon-text">Messaging</span>
                        <span className="nav-bar-tooltip-text">coming soon!</span>

                    </div>
                    <div className="icon-container-jobs">
                        <i className="fa-solid fa-briefcase main-nav-icons"></i>
                        <span className="icon-text">Jobs</span>
                        <span className="nav-bar-tooltip-text">coming soon!</span>
                    </div>
                    <ProfileDropDown />
                </div>

            </div>
        </div >
    )
}

export default FeedNavBar;