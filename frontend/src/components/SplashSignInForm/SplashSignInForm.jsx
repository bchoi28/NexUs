import './SplashSignInForm.css'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginDemo, loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';
import { loginRequest } from '../../store/ui';
import { fetchPosts } from '../../store/post';

const SplashSignInForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const errors = useSelector(state => Object.values(state.errors));
    const [emailError, passwordError] = errors ?? [];

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    useEffect(() => {
        dispatch(removeSessionErrors());
        return () => {
            setEmail('');
            setPassword('');
            dispatch(removeSessionErrors());
        }
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
    }

    const handleDemo = () => {
        dispatch(fetchPosts());
        dispatch(loginDemo({ email: 'demo@user.io', password: 'password' }))
        dispatch(loginRequest());
    }

    const handleJoin = () => {
        setEmail('');
        setPassword('');
        dispatch(removeSessionErrors())
        history.push('/signup')
    }

    return (
        <>
            <div className='splash-signin-form-container'>
                <form className='splash-signin-form' onSubmit={handleSubmit}>

                    <label className='input-label' htmlFor="email">Email</label>
                    <input className='text-input-div' id="email" type="text" value={email} onChange={handleEmail} />
                    {/* <div className='text-input-div'></div> */}
                    <p className='input-helper'>
                        {emailError && emailError.length !== 0 && <div>{emailError}</div>}
                    </p>

                    <label className='input-label' htmlFor="password">Password</label>
                    <input className='text-input-div' id="password" type="password" value={password} onChange={handlePassword} />
                    {/* <div className='text-input-div' ></div> */}

                    <p className='input-helper'>
                        {passwordError && passwordError.length !== 0 && <div>{passwordError}</div>}
                    </p>

                    <button type='submit' className='btn-primary signin-btn btn-md'>Sign in</button>
                </form >

                <div className='signin-form-divider left-right-divider'>
                    <p className='signin-form-divider-text'>or</p>
                </div>

                <button className='btn-md demo-btn' onClick={handleDemo}>
                    Sign in as demo user
                </button>

                <button className='btn-secondary btn-md join-now-btn' onClick={handleJoin}>
                    New to NexUs? Join now
                </button>
            </div >
        </>
    )
}

export default SplashSignInForm;