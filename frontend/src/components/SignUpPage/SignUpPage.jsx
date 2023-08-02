import SignUpForm from '../SignUpForm';
import NameForm from './NameForm';
import './SignUpPage.css';
import { useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signupUser } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';
import { fetchPosts } from '../../store/post';
import { getUiState } from '../../store/ui';
import Login from '../Login';
import { getSessionUser } from '../../store/session';

const SignUpPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(getUiState)
    const currentUser = useSelector(getSessionUser);

    const handleLogo = () => {
        history.push('/');
    }

    const [email, setEmail] = useState('');
    const [formStep, setFormStep] = useState(1);
    const [userObject, setUserObject] = useState({});

    const handleSignup = ({ email, password }) => {
        setUserObject({ email, password });
        setFormStep(2);
    }

    const handleNameForm = async ({ fname, lname, headline }) => {
        // setUserObject({ ...userObject, fname, lname })
        const res = await dispatch(signupUser({ ...userObject, fname, lname, headline }))

        if (res.ok) {
            history.push('/feed')
        } else {
            setFormStep(1);
            setUserObject({});
        }
    }
    useEffect(() => {
        return () => {
            dispatch(removeSessionErrors())
        }
    }, [dispatch])

    if (loading) {
        return <Login />
    }

    if (currentUser) {
        return <Redirect to='/feed' />
    };

    return (
        <div className='signup-page-container'>
            <div className='signup-page-header'>
                <div onClick={handleLogo} className="signup-nav-logo">
                    <img className='splash-logo' src='/assets/images/seeds/logo-canvas.png' alt='logo' />
                </div>
                <div className='signup-title'>Make the most of your professional life</div>
            </div>
            <div className='signup-page-main-container'>
                {formStep === 1 && <SignUpForm onSubmit={handleSignup} email={email} setEmail={setEmail} />}
                {formStep === 2 && <NameForm onSubmit={handleNameForm} />}
            </div>
        </div>
    )
}

export default SignUpPage;