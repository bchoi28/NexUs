import SignInForm from './SignInForm';
import './SignInPage.css';
import { NavLink } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className='signin-page-container'>
            <header className='signin-page-header'>
                <div className="signin-nav-logo">Nex<span className='logo-us'>us</span></div>
                {/* change this to image/logo later */}
            </header>
            <div className='signin-page-main-container'>
                <SignInForm />
            </div>
            <footer className='signin-page-footer'>
                <div>New to NexUs?</div>
                <NavLink className="signin-page-join-btn" to='/signup'>Join now</NavLink>
            </footer>
        </div>
    )
}

export default SignInPage;