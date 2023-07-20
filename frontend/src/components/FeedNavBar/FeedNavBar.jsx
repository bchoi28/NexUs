import './FeedNavBar.css'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getSessionUser } from '../../store/session';
import ProfileDropDown from './ProfileDropDown';
import SearchBar from '../SearchBar/SearchBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const FeedNavBar = () => {

    const history = useHistory();
    const location = useLocation();
    const currentUser = useSelector(getSessionUser);
    const isFeedPage = location.pathname === '/feed';
    const isNetworkPage = location.pathname === '/mynetwork';

    if (!currentUser) {
        return <h1>Loading Nav Bar...</h1>
    }

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

    return (
        <div className='main-nav-container-full'>
            <div className='main-nav-container'>

                <div className='left-main-nav'>
                    <div className='feed-nav-logo-us' onClick={handleHomeClick}>us</div>
                    <SearchBar />
                </div>

                <div className='right-main-nav'>

                    <div className={`icon-container ${isFeedPage ? 'active' : ''}`} onClick={handleHomeClick}>
                        <i className="fa-solid fa-house main-nav-icons home-icon"></i>
                        <span className="icon-text">Home</span>
                    </div>
                    <div className={`icon-container ${isNetworkPage ? 'active' : ''}`} onClick={handleNetworkClick} >
                        <i className="fa-solid fa-user-group main-nav-icons"></i>
                        {/* <i className="fa-solid fa-people-group main-nav-icons"></i> */}
                        <span className="icon-text">My Network</span>
                    </div>
                    {/* <Link to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank">
                        <div className='icon-container'>
                            <i className="fa-brands fa-linkedin-in main-nav-icons"></i>
                            <span className="icon-text">LinkedIn</span>
                        </div>
                    </Link>
                    <Link to={{ pathname: 'https://github.com/bchoi28' }} target="_blank">
                        <div className='icon-container'>
                            <i className="fa-brands fa-github main-nav-icons"></i>
                            <span className="icon-text">GitHub</span>
                        </div>
                    </Link> */}
                    <ProfileDropDown />
                </div>

            </div>
        </div >
    )
}

export default FeedNavBar;