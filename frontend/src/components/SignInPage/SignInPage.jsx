import { useDispatch, useSelector } from 'react-redux';
import SignInForm from './SignInForm';
import './SignInPage.css';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getUiState } from '../../store/ui';
import Login from '../Login';
import { useEffect } from 'react';
import { removeSessionErrors } from '../../store/errors';

const SignInPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(getUiState);

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/')
    }

    useEffect(() => {
        dispatch(removeSessionErrors())

    }, []);

    if (loading) {
        return <Login />
    } else {
        return (
            <div className='signin-page-container'>
                <header className='signin-page-header'>
                    <div
                        className="signin-nav-logo"
                        onClick={handleClick}
                    >Nex
                        <span className='logo-us'>us</span></div>
                    {/* change this to image/logo later */}
                </header>
                <footer className='signin-page-footer'>
                    <div>New to NexUs?</div>
                    <NavLink className="signin-page-join-btn" to='/signup'>Join now</NavLink>
                </footer>
                <div className='signin-page-main-container'>
                    <SignInForm />
                </div>
            </div>
        )
    }
}

export default SignInPage;