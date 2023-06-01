import './SplashSignInForm.css'
import { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';

const SplashSignInForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [errors, setErrors] = useState([]);
    const errors = useSelector(state => Object.values(state.errors));
    const [emailError, passwordError] = errors ?? [];
    // debugger

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

    if (sessionStorage.getItem('currentUser')) {
        history.push('/feed')
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // debugger
        dispatch(loginUser({ email, password }))
        debugger

    }

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: 'demo@user.io', password: 'password' }))
    }

    const handleJoin = () => {
        dispatch(removeSessionErrors())
        history.push('/signup')
    }

    return (
        <>
            <div className='signin-form-container'>
                <form className='signin-form' onSubmit={handleSubmit}>

                    <label className='input-label' htmlFor="email">Email</label>
                    <div className='text-input-div'>
                        <input className='text-input' id="email" type="text" value={email} onChange={handleEmail} />
                    </div>
                    <p className='input-helper'>
                        {emailError && emailError.length !== 0 && <div>{emailError}</div>}
                    </p>

                    <label className='input-label' htmlFor="password">Password</label>
                    <div className='text-input-div' >
                        <input className='text-input' id="password" type="password" value={password} onChange={handlePassword} />
                    </div>

                    <p className='input-helper'>
                        {passwordError && passwordError.length !== 0 && <div>{passwordError}</div>}
                    </p>

                    <button type='submit' className='btn-primary signin-btn btn-md'>Sign in</button>
                </form>

                <div className='signin-form-divider left-right-divider'>
                    <p className='signin-form-divider-text'>or</p>
                </div>

                <button className='btn-md demo-btn' onClick={handleDemo}>
                    Sign in as demo user
                </button>

                <button className='btn-secondary btn-md join-now-btn' onClick={handleJoin}>
                    New to NexUs? Join now
                </button>
            </div>
        </>
    )
}

export default SplashSignInForm;