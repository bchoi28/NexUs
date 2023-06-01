import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import './FeedNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/session';

const FeedNavBar = () => {

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(true);
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className='main-nav-container'>

            <div className='left-main-nav'>

                <NavLink to='/'>Logo</NavLink>

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