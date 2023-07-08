import './FeedNavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getSessionUser } from '../../store/session';
import ProfileDropDown from './ProfileDropDown';
import SearchBar from '../SearchBar/SearchBar';

const FeedNavBar = () => {

    const currentUser = useSelector(getSessionUser);

    if (!currentUser) {
        return <h1>Loading Nav Bar...</h1>
    }

    return (
        <div className='main-nav-container-full'>
            <div className='main-nav-container'>

                <div className='left-main-nav'>
                    <NavLink to='/feed' className='feed-nav-logo-us'>us</NavLink>
                    <SearchBar />
                </div>

                <div className='right-main-nav'>
                    <NavLink to='/feed' className='icon-container'>
                        <i class="fa-solid fa-house main-nav-icons home-icon"></i>
                        <span className="icon-text">Home</span>
                    </NavLink>
                    {/* <Link to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank">
                        <div className='icon-container'>
                            <i class="fa-brands fa-linkedin-in main-nav-icons"></i>
                            <span className="icon-text">LinkedIn</span>
                        </div>
                    </Link>
                    <Link to={{ pathname: 'https://github.com/bchoi28' }} target="_blank">
                        <div className='icon-container'>
                            <i class="fa-brands fa-github main-nav-icons"></i>
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