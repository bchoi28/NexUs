import SplashSignInForm from "../SplashSignInForm";
import SplashNavBar from "./SplashNavBar";
import './SplashPage.css';
import spaceImage from '../../images/space.jpg';
import { useState } from "react";

const SplashPage = () => {

    const [showSpace, setShowSpace] = useState(false);

    const toggleSpace = (e) => {
        setShowSpace(prevState => !prevState)
    };

    return (
        <>
            <nav className="splash-nav-container">
                <SplashNavBar />
            </nav>
            <div className="splash-main-container">
                <div className="splash-page-section-1">
                    <div className="splash-page-section-1-left">
                        <h1 className="splash-title-1">
                            Welcome to your
                            <span className="toggle-space" onMouseEnter={toggleSpace} onMouseLeave={toggleSpace}>
                                {showSpace ? ' intergalactic ' : ' professional '}
                            </span>
                            community
                        </h1>
                        <SplashSignInForm />
                    </div>
                    <div className="splash-page-section-1-right">
                        <img
                            className="splash-image"
                            src='https://nexus-seeds.s3.amazonaws.com/nexus-images/splash.svg'
                            alt="Welcome to your professional community" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashPage;