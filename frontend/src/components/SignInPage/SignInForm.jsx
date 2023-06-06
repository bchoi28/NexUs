import './SignInForm.css'
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';
import { getUser } from '../../store/user';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { loginRequest, loginSuccess } from '../../store/ui';

const SignInForm = () => {

    const dispatch = useDispatch();
    // const history = useHistory();
    const currentUser = useSelector(getUser);
    // const loading = useSelector(getUiState);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [errors, setErrors] = useState([]);
    const errors = useSelector(state => Object.values(state.errors));
    const [emailError, passwordError] = errors ?? [];
    // debugger

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    useEffect(() => {

        return () => {
            // debugger
            dispatch(removeSessionErrors());
            // debugger
        }
    }, [])

    // if (sessionStorage.getItem('currentUser')) {
    //     history.push('/feed')
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        // debugger
        dispatch(loginUser({ email, password }))
    }

    const handleDemo = async (e) => {
        e.preventDefault();
        dispatch(loginRequest());
        await dispatch(loginUser({ email: 'demo@user.io', password: 'password' }))
        dispatch(loginSuccess());
    }

    if (currentUser) {
        return <Redirect to='/feed' />
    }

    return (
        <div className='signin-form-container'>
            <div className='signin-form-heading'>Sign in</div >
            <div className='signin-form-subheading'>Stay updated on your professional world</div>
            <form className='signin-form' onSubmit={handleSubmit}>

                <div className='signin-form-text-input-div'>
                    <input
                        className='signin-form-text-input'
                        id="email"
                        type="text"
                        value={email}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        onChange={handleEmail} />
                    <label
                        className={`floating-label ${email || emailFocused ? 'focused' : ''}`}
                        htmlFor="email">
                        Email
                    </label>
                </div>
                <p className='input-helper'>
                    {emailError && emailError.length !== 0 && <div>{emailError}</div>}
                </p>

                <div className='signin-form-text-input-div' >
                    <input
                        className='signin-form-text-input'
                        id="password"
                        type="password"
                        value={password}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={handlePassword} />
                    <label
                        className={`floating-label ${email || passwordFocused ? 'focused' : ''}`}
                        htmlFor="password">
                        Password
                    </label>
                </div>
                <p className='input-helper'>
                    {passwordError && passwordError.length !== 0 && <div>{passwordError}</div>}
                </p>

                <button type='submit' className='btn-primary signin-btn btn-md signin-page-btn'>Sign in</button>
            </form>

            <div className='signin-page-form-divider left-right-divider'>
                <p className='signin-form-divider-text'>or</p>
            </div>

            <button className='signin-demo-btn' onClick={handleDemo}>
                Sign in as demo user
            </button>

        </div >
    )
}

export default SignInForm;