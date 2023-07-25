import './SplashNavBar.css';
import { NavLink } from 'react-router-dom';

const SplashNavBar = () => {
    return (
        <div className="splash-nav-bar-main">
            <div className="splash-nav-logo">Nex<span className='logo-us'>us</span></div>
            <div className="splash-nav-links">
                <NavLink className="btn-md btn-tertiary" to='/signup'>Join now</NavLink>
                <NavLink className="btn-md btn-secondary-emphasis splash-sign" to='/login'>Sign in</NavLink>
            </div>
        </div>
    )
}

export default SplashNavBar;
