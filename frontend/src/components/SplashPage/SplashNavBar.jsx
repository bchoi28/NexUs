import { useHistory } from 'react-router-dom';
import './SplashNavBar.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';

const SplashNavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogo = () => {
        history.go(0);
    }

    useEffect(() => {
        return () => {
            dispatch(removeSessionErrors());
        }
    }, [])

    return (
        <div className="splash-nav-bar-main">
            {/* <div className="splash-nav-logo" onClick={handleLogo}>Nex<span className='logo-us'>us</span></div> */}
            <div className='logo-nexus-container' onClick={handleLogo}>
                <img className='splash-logo splash-page' src='/assets/images/seeds/logo-new.png' alt='logo' />
            </div>
            <div className="splash-nav-links">
                <NavLink className="btn-md btn-tertiary" to='/signup'>Join now</NavLink>
                <NavLink className="btn-md btn-secondary-emphasis splash-sign" to='/login'>Sign in</NavLink>
            </div>
        </div>
    )
}

export default SplashNavBar;
