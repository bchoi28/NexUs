import SplashSignInForm from "../SplashSignInForm";
import SplashNavBar from "./SplashNavBar";
import './SplashPage.css';
// import spaceImage from '../../images/space.jpg';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUiState } from "../../store/ui";
import Login from "../Login/Login";
import { getSessionUser } from "../../store/session";
import { fetchPosts } from "../../store/post";

const SplashPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    const [showSpace, setShowSpace] = useState(false);
    debugger
    const toggleSpace = (e) => {
        setShowSpace(prevState => !prevState)
    };

    const loading = useSelector(getUiState);
    if (loading) {
        return <Login />
    }

    if (currentUser) {
        dispatch(fetchPosts());
        return <Redirect to='/feed' />
    }

    return (
        <div className="splash-container">
            <nav className="splash-nav-container">
                <SplashNavBar />
            </nav>
            <div className="splash-main-container">
                <div className="splash-page-section-1">
                    <div className="splash-page-section-1-left">
                        <h1 className="splash-title-1">
                            Welcome to your
                            <div className="toggle-space" onMouseEnter={toggleSpace} onMouseLeave={toggleSpace} >
                                <span >
                                    {showSpace ? ' multiversal ' : ' professional '}
                                </span>
                            </div>
                            community
                        </h1>
                        <SplashSignInForm />
                    </div>
                    <div className="splash-page-section-1-right">
                        <img
                            className={`splash-image-1 ${showSpace ? 'hide' : 'show'}`}
                            src='https://nexus-seeds.s3.amazonaws.com/nexus-images/splash.svg'
                            alt="splash" />
                        <img
                            className={`splash-image-2 ${showSpace ? 'show' : 'hide'}`}
                            src='/assets/images/seeds/splash3.JPG'
                            alt="splash" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;