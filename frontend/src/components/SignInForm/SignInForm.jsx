import './SignInForm.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();



    }

    return (
        <>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={email} onChange={handleEmail} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={handlePassword} />
                {/* <Link>Forgot Password?</Link> */}
                <button type='submit'>Sign in</button>
            </form>
            <div className='sign-in-form-divider'>
                <p>or</p>
            </div>
            <button className='join-now-button'>
                <Link>New to NexUs? Join now</Link>
            </button>
        </>
    )
}

export default SignInForm;