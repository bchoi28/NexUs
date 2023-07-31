import { useHistory } from 'react-router-dom';
import './SplashNavBar.css';
import { NavLink } from 'react-router-dom';

const SplashNavBar = () => {
    const history = useHistory();
    const handleLogo = () => {
        history.go(0);
    }
    return (
        <div className="splash-nav-bar-main">
            {/* <div className="splash-nav-logo" onClick={handleLogo}>Nex<span className='logo-us'>us</span></div> */}
            <div className='logo-nexus-container' onClick={handleLogo}>
                <div className="splash-nav-logo-nex">Nex</div>
                <div className='logo-us-container'><span className='logo-us-text'>us</span></div>
            </div>
            <div className="splash-nav-links">
                <NavLink className="btn-md btn-tertiary" to='/signup'>Join now</NavLink>
                <NavLink className="btn-md btn-secondary-emphasis splash-sign" to='/login'>Sign in</NavLink>
            </div>
        </div>
    )
}

export default SplashNavBar;
