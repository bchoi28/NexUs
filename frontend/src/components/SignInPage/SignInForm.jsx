import './SignInForm.css'
import { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { removeSessionErrors } from '../../store/errors';

const SignInForm = () => {

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
        // .catch(async (res) => {
        //     let data;
        //     debugger
        //     try {
        //         // .clone() essentially allows you to read the response body twice
        //         data = await res.clone().json();
        //     } catch {
        //         data = await res.text(); // Will hit this case if the server is down
        //     }
        //     if (data?.errors) dispatch(receiveSessionErrors(data.errors))
        // });

        // const currentUser = sessionStorage.getItem('currentUser')
        // if (currentUser) {
        //     return <Redirect to='' />
        // }

        // if (!errors) {
        //     history.push('/feed');
        // }

    }

    const handleJoin = () => {
        history.push('/signup')
    }

    return (
        <>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={email} onChange={handleEmail} />
                {emailError && emailError.length !== 0 && <div>{emailError}</div>}
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={handlePassword} />
                {passwordError && passwordError.length !== 0 && <div>{passwordError}</div>}
                {/* <Link>Forgot Password?</Link> */}
                <button type='submit'>Sign in</button>
            </form>
            <div className='sign-in-form-divider'>
                <p>or</p>
            </div>
            <button className='join-now-button' onClick={handleJoin}>
                New to NexUs? Join now
            </button>
        </>
    )
}

export default SignInForm;