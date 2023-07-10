import './ProfileDropDown.css';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchSessionUser, getSessionUser, setSession } from '../../../store/session';
import { removeUser } from '../../../store/user';


const ProfileDropDown = () => {
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const currentUser = useSelector(getSessionUser);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const profilePhoto = currentUser.photoUrl;
    // if (!profilePhoto) {
    //     dispatch(fetchSessionUser(currentUser.id))
    //     return <p>...</p>
    // }

    return (
        <div className="profile-dropdown">
            <button ref={dropdownRef} onClick={toggleDropdown} className="profile-button">
                <img className='profile-button-pic' src={profilePhoto ? profilePhoto : '/assets/images/seeds/default-profile-image-circle.png'} alt="profile" />
                <div className='me-arrow'>
                    <span className="profile-icon-text">Me</span>
                    <span className="down-arrow">&#9660;</span>
                </div>
            </button>

            {dropdownOpen && (
                <div className='profile-dropdown-menu'>
                    <div className='profile-dropdown-top-container'>
                        <div className='profile-dropdown-top'>
                            <img className='profile-dropdown-pic' src={profilePhoto ? profilePhoto : '/assets/images/seeds/default-profile-image-circle.png'} alt="" />
                            <div className='profile-dropdown-info'>
                                <div className='profile-dropdown-names'>{currentUser.fName} {currentUser.lName}</div>
                                <div className='profile-dropdown-headline'>{currentUser.headline}</div>
                            </div>
                        </div>
                        <div className='profile-dropdown-view-profile-button-container'>
                            <NavLink to={`/profile/${currentUser.id}`} className="dropdown-profile-view-button">View Profile</NavLink>
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