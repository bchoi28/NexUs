import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import './FeedNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/session';
import { useHistory } from 'react-router-dom';

const FeedNavBar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => setDropdownOpen(!prevState));
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const handleLogo = () => {
        history.push('/');
    }

    return (
        <div className='main-nav-container'>

            <div className='left-main-nav'>

                <div onClick={handleLogo} className='feed-nav-logo-us'>us</div>

            </div>

            <div className='right-main-nav'>

                <div className="profile-button">
                    <button onClick={toggleDropdown}>
                        me
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <NavLink to="/logout">Sign Out</NavLink>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default FeedNavBar;