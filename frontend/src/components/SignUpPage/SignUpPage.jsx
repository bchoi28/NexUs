import SignUpForm from '../SignUpForm';
import './SignUpPage.css';

const SignUpPage = () => {

    return (
        <div className='signup-page'>
            <main className='signup-main'>
                <div className='signup-logo'>NexUs</div>
                <div className='signup-subtitle'>Make the most of your professional life</div>
                <div className='signup-form-container'>
                    <SignUpForm />
                </div>
            </main>
        </div>
    )
}

export default SignUpPage;