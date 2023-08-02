import { NavLink, Redirect } from 'react-router-dom';
import './SignUpForm.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionUser, loginUser } from '../../store/session';
import { loginRequest } from '../../store/ui';
import { removeSessionErrors } from '../../store/errors';
import { fetchPosts } from '../../store/post';

const SignUpForm = ({ onSubmit, email, setEmail }) => {

    const dispatch = useDispatch();

    const errors = useSelector(state => Object.values(state.errors));
    const currentUser = useSelector(getSessionUser);
    const emailErrors = errors.filter(error => error.toLowerCase().includes("email"));
    const passwordErrors = errors.filter(error => error.toLowerCase().includes("password"));


    const [password, setPassword] = useState('');
    const [finalErrors, setFinalErrors] = useState({})

    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const validate = (email, password) => {
        const inputErrors = { email: '', password: '' };

        // email validation
        if (!email) {
            inputErrors.email = 'Please enter your email address.'
        } else if (email && !emailRegEx.test(email)) {
            inputErrors.email = 'Please enter a valid email address.'
        }

        // password validation
        if (!password) {
            inputErrors.password = 'Please enter your password.'
        } else if (password && password.length < 6) {
            inputErrors.password = 'Password must be 6 characters or more.'
        }

        return inputErrors;
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate(email, password);
        if (Object.values(formErrors).some(value => value !== '')) {
            setFinalErrors(formErrors);
            return;
        }

        const userObjectStep1 = {
            email: email,
            password: password
        }
        onSubmit(userObjectStep1)
    }


    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(fetchPosts())
        dispatch(loginRequest());
        dispatch(loginUser({ email: 'demo@user.io', password: 'password' }));
    }
    useEffect(() => {

        return () => {
            dispatch(removeSessionErrors());
            setEmail('');
            setPassword('');
        }
    }, [])

    if (currentUser) {
        dispatch(fetchPosts());
        return <Redirect to='/feed' />
    };

    return (
        <>

            <main>
                <form onSubmit={handleSubmit} className='signup-form'>

                    <label className='input-label' htmlFor="email">Email</label>
                    <input
                        className='email'
                        type="text"
                        id='email'
                        value={email}
                        onChange={handleEmail} />

                    {finalErrors && <div className='signup-input-helper'>{finalErrors.email}</div>}

                    {emailErrors.length > 0 && emailErrors.map((error, i) => (
                        <div className='signup-input-helper' key={i}>{error}</div>
                    ))}
                    <label className='input-label' htmlFor="password">Password (6 or more characters)</label>
                    <input
                        className='password'
                        type="text"
                        id='password'
                        value={password}
                        onChange={handlePassword} />

                    {finalErrors && <div className='signup-input-helper'>{finalErrors.password}</div>}


                    {passwordErrors.length > 0 && passwordErrors.map((error, i) => (
                        <div className='signup-input-helper' key={i}>{error}</div>
                    ))}

                    <button type='submit'
                        className='btn-primary signin-btn btn-md signup-page-btn'>
                        Join
                    </button>

                    <div className='signup-page-form-divider left-right-divider' >
                        <p className='signin-form-divider-text'>or</p>
                    </div>

                    <button className='signin-demo-btn' onClick={handleDemo}>
                        Sign in as demo user
                    </button>

                    <div className='link-to-signin'>
                        Already on NexUs?{' '}
                        <NavLink className='link-signin' to="/login" >Sign in</NavLink>
                    </div>
                </form>
            </main>
        </>
    )
}

export default SignUpForm;