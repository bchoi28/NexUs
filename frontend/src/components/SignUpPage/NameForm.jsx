import './NameForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { signupUser } from '../../store/user';

const NameForm = ({ onSubmit }) => {

    // const dispatch = useDispatch();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [errors, setErrors] = useState({})

    const validate = (fname, lname) => {
        const inputErrors = { fname: '', lname: '' }

        if (!fname) inputErrors.fname = 'Please enter a first name.'
        if (!lname) inputErrors.lname = 'Please enter a last name'

        return inputErrors;
    }

    const handleFname = (e) => {
        setFname(e.target.value)
    }

    const handleLname = (e) => {
        setLname(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameErrors = validate(fname, lname);
        if (Object.values(nameErrors).some(error => error !== '')) {
            setErrors(nameErrors);
            return
        }


        const userObjectStep2 = {
            fname: fname,
            lname: lname
        }
        onSubmit(userObjectStep2)

    }

    return (
        <>
            <form className='name-form' onSubmit={handleSubmit}>
                <label className='input-label' htmlFor="fname">First name</label>
                <input
                    className='fname'
                    type="text"
                    id='fname'
                    value={fname}
                    onChange={handleFname} />
                {errors && <div className='signup-input-helper'>{errors.fname}</div>}


                <label className='input-label' htmlFor="lname">Last name</label>
                <input
                    className='lname'
                    type="text"
                    id='lname'
                    value={lname}
                    onChange={handleLname} />
                {errors && <div className='signup-input-helper'>{errors.lname}</div>}

                <button type='submit'
                    className='btn-primary signin-btn btn-md signup-page-btn'>
                    Continue
                </button>
            </form>
        </>
    )
}

export default NameForm;