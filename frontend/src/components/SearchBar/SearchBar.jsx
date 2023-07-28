import './SearchBar.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersSearch } from '../../store/user';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const searchResults = useSelector(state => state.user.searchResults);
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (e) => {
        debugger
        setSearch(e.target.value);
        if (e.target.value !== '') {
            dispatch(fetchUsersSearch(e.target.value));
            setShowResults(true);
        } else setShowResults(false);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (query !== '') {
    //         const users = await dispatch(fetchUsersSearch(query));
    //         if (users && users.length > 1) {
    //             history.push(`/profile/${users[0].id}`);
    //         }
    //     }
    // }

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        if (showResults && searchResults.length > 0) {
            history.push(`/profile/${searchResults[0].id}`);
        }
    };


    return (
        <div className='search-bar-container'>
            <form className='search-bar-form' onSubmit={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass search-icon" onClick={handleSubmit}></i>
                <input
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search"
                    className='search-bar-input'
                />
            </form>
            <div className='search-results'>
                {showResults ? searchResults.map(user => (
                    <NavLink to={`/profile/${user.id}`} className='link-headline' key={user.id}>
                        <img className='search-result-photo' src={user.photoUrl ? user.photoUrl : '/assets/images/seeds/default-profile-image-circle.png'} alt="profile" />
                        <div className='search-link' >{user.fName} {user.lName} </div>
                        <span className='search-headline' >{user.headline}</span>
                    </NavLink>
                )) : null}
            </div>
        </div>
    );
};


export default SearchBar;