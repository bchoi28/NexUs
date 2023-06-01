import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../store/session";
import LoadingLogo from "../LoadingLogo";

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(logoutUser())
            .then(() => {
                setLoading(false);
                history.push('/login');
            })
            .catch(() => setLoading(false));
    }, [dispatch, history]);

    return (
        loading ? <LoadingLogo /> : null
    );
}

export default Logout;