import SignUpForm from '../SignUpForm';
import NameForm from './NameForm';
import './SignUpPage.css';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signupUser } from '../../store/user';
import { useDispatch } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';

const SignUpPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogo = () => {
        history.push('/');
    }

    const [email, setEmail] = useState('');
    const [formStep, setFormStep] = useState(1);
    const [userObject, setUserObject] = useState({});

    const handleSignup = ({ email, password }) => {
        debugger
        setUserObject({ email, password });
        setFormStep(2);
    }

    const handleNameForm = async ({ fname, lname }) => {
        debugger
        // setUserObject({ ...userObject, fname, lname })
        const res = await dispatch(signupUser({ ...userObject, fname, lname }))

        if (res.ok) {
            history.push('/feed')
        } else {
            setFormStep(1);
            setUserObject({});
        }
    }
    useEffect(() => {
        debugger
        return () => {
            dispatch(removeSessionErrors())
        }
    }, [])

    debugger
    return (
        <div className='signup-page-container'>
            <header className='sigup-page-header'>
                <div onClick={handleLogo} className="signup-nav-logo">Nex<span className='signup-logo-us'>us</span></div>
                <div className='signup-title'>Make the most of your professional life</div>
            </header>
            <div className='signup-page-main-container'>
                {formStep === 1 && <SignUpForm onSubmit={handleSignup} email={email} setEmail={setEmail} />}
                {formStep === 2 && <NameForm onSubmit={handleNameForm} />}
            </div>
        </div>
    )
}

export default SignUpPage;