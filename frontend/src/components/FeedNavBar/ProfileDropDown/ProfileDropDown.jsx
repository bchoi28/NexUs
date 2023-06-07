import './ProfileDropDown.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileDropDown = ({ currentUser }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="profile-dropdown">
            <button onClick={toggleDropdown} className="profile-button">
                Me
            </button>
            {dropdownOpen && (
                <div className="profile-dropdown-menu">
                    <div className='profile-dropdown-top-container'>
                        <div className='profile-dropdown-top'>
                            <div>img</div>
                            <div className='profile-dropdown-info'>
                                <div className='profile-dropdown-names'>{currentUser.fName} {currentUser.lName}</div>
                                <div className='profile-dropdown-headline'>{currentUser.headline}</div>
                            </div>
                        </div>
                        <div className='profile-dropdown-view-profile-button-container'>
                            <NavLink to="/profile" className="dropdown-profile-view-button">View Profile</NavLink>
                        </div>
                    </div>
                    <div className='profile-dropdown-bottom-container'>
                        <NavLink className='dropdown-logout-button' to="/logout">Sign Out</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropDown;