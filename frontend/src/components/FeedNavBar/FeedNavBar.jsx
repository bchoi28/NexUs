import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react';
import './FeedNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/session';
import { useHistory } from 'react-router-dom';
import ProfileDropDown from './ProfileDropDown';
import userReducer from '../../store/user';

const FeedNavBar = ({ currentUser }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogo = () => {
        history.push('/');
    }

    return (
        <div className='main-nav-container-full'>
            <div className='main-nav-container'>

                <div className='left-main-nav'>
                    <NavLink to='/feed' className='feed-nav-logo-us'>us</NavLink>
                </div>

                <div className='right-main-nav'>
                    {/* <div className='icon-container'>
                        <i class="fa-solid fa-house main-nav-icons home-icon"></i>
                        <span className="icon-text">Home</span>
                    </div> */}
                    <Link to={{ pathname: 'https://www.linkedin.com/in/brandonchoi28/' }} target="_blank">
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
                    </Link>
                    <ProfileDropDown currentUser={currentUser} />
                </div>

            </div>
        </div >
    )
}

export default FeedNavBar;