import { NavLink, useHistory, Redirect } from 'react-router-dom';
import './SignUpForm.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';
import { removeSessionErrors } from '../../store/errors';
import LoadingLogo from '../LoadingLogo';

const SignUpForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector(state => Object.values(state.errors));
    const emailErrors = errors.filter(error => error.toLowerCase().includes("email"));
    const passwordErrors = errors.filter(error => error.toLowerCase().includes("password"));

    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // setIsLoading(true);

        dispatch(signup({ email: state.email, password: state.password }))

        // setIsLoading(false);

    }

    useEffect(() => {

        // if (!errors)
        return () => {
            // debugger
            // if (errors && errors.length !== 0) dispatch(removeSessionErrors())
            dispatch(removeSessionErrors());
            // debugger
        }
    }, [])

    if (sessionStorage.getItem('currentUser')) {
        history.push('/feed')
    }

    return (
        <>

            <main>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <label htmlFor="email">Email</label>
                    <input className='email' type="text" id='email' value={state.email} name='email' onChange={handleChange} />
                    {emailErrors.length > 0 && emailErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}                    <label htmlFor="password">Password (6 or more characters)</label>
                    <input className='password' type="text" id='password' value={state.password} name='password' onChange={handleChange} />
                    {passwordErrors.length > 0 && passwordErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                    <button type='submit'>Join</button>
                    <p className='signup-form-divider'>or</p>
                    <div className='link-to-signin'>
                        Already on NexUs?{' '}
                        <NavLink to="/login" >Sign in</NavLink>
                    </div>
                </form>
            </main>
        </>
    )
}

export default SignUpForm;