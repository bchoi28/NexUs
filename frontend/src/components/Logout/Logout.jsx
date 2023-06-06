import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import LoadingLogo from "../LoadingLogo";
import { getUser } from "../../store/user";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getUser);

    useEffect(() => {
        dispatch(logoutUser());
    })

    if (currentUser) {
        return <LoadingLogo />
    } else {
        return <Redirect to='/login' />
    }
}

export default Logout;