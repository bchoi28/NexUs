import { useEffect } from "react";
import './Logout.css'
import { useDispatch, useSelector } from "react-redux";
import { getSessionUser, logoutUser } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)

    useEffect(() => {
        dispatch(logoutUser());
    })

    if (currentUser) {
        return (
            <div className="logout-container">
                <div className="logout-logo-container">
                    <div className="logout-logo-nex">Good<span className='logout-logo-us'>bye</span></div>
                </div>
            </div>
        )
    } else {
        return <Redirect to='/login' />
    }
    // if (currentUser) {
    //     return <LoadingLogo />
    // } else {
    //     return <Redirect to='/login' />
    // }
}

export default Logout;