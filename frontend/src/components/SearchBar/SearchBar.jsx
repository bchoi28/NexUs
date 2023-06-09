import './SearchBar.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersSearch } from '../../store/user';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const searchResults = useSelector(state => state.user.searchResults);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value !== '') {
            dispatch(fetchUsersSearch(e.target.value));
        }
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
        e.preventDefault();
        if (searchResults.length > 0) {
            history.push(`/profile/${searchResults[0].id}`);
        }
    };


    return (
        <div className='search-bar-container'>
            <form className='search-bar-form' onSubmit={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search"
                    className='search-bar-input'
                />
            </form>
            <div className='search-results'>
                {searchResults.map(user => (
                    <div className='link-headline' key={user.id}>
                        <NavLink className='search-link' to={`/profile/${user.id}`}>{user.fName} {user.lName} </NavLink>
                        <span className='search-headline' >{user.headline}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default SearchBar;