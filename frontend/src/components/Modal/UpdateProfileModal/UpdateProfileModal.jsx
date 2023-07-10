import './UpdateProfileModal.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modal';
import { useState } from 'react';
import { updateUser } from '../../../store/user';
import { getSessionUser } from '../../../store/session';

const UpdateProfileModal = (profileInfo) => {
    const { fName, lName, headline, pronouns, locationCity, locationCountryRegion } = profileInfo;

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)

    const [isOpen, setIsOpen] = useState(true);
    const [firstName, setFirstName] = useState(fName);
    const [lastName, setLastName] = useState(lName);
    const [headLine, setHeadLine] = useState(headline);
    const [proNouns, setPronouns] = useState(pronouns);
    const [locationcity, setLocationCity] = useState(locationCity);
    const [locationcountryregion, setLocationCountryRegion] = useState(locationCountryRegion);

    const handlefName = (e) => {
        setFirstName(e.target.value);
    }
    const handlelName = (e) => {
        setLastName(e.target.value);
    }
    const handleHeadline = (e) => {
        setHeadLine(e.target.value);
    }
    const handlePronouns = (e) => {
        setPronouns(e.target.value);
    }
    const handleLocationCity = (e) => {
        setLocationCity(e.target.value);
    }
    const handleLocationCountryRegion = (e) => {
        setLocationCountryRegion(e.target.value);
    }

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeModal())
        setIsOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const user = {
        //     id: currentUser.id,
        //     about: updatedAbout
        // }
        // await dispatch(updateUser(user));
        // dispatch(closeModal())
        // setIsOpen(false);
    }

    return (
        <Modal
            className='modal-custom intro-custom'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
        >
            <div className='update-intro-container'>
                <header className='update-intro-header'>
                    <div className='update-intro-title'>Edit intro</div>
                    <div className='update-modal-close-container'>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                </header>
                <form className='update-intro-form-container' onSubmit={handleSubmit}>
                    <div className='required'>* indicates required</div>
                    <div>
                        <label className='update-intro-label' htmlFor="firstName">First name*</label>
                        <input className='update-intro-input' id='firstName' type="text" value={firstName} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="lastName">Last name*</label>
                        <input className='update-intro-input' id='lastName' type="text" value={lastName} />
                    </div>
                    <div className='update-intro-pronouns-container'>
                        <label className='update-intro-label' htmlFor="pronouns">Pronouns</label>
                        <input className='update-intro-input' id='pronouns' type="text" value={proNouns} />
                        <label className='update-intro-pronouns-label' htmlFor="pronouns">Let others know how to refer to you.</label>
                    </div>
                    <div className='update-intro-headline-container'>
                        <label className='update-intro-label' htmlFor="headline">Headline*</label>
                        <input className='update-intro-input' id='headline' type="text" value={headLine} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="country/region">Country/Region*</label>
                        <input className='update-intro-input' id='country/region' type="text" value={locationcountryregion} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="city">City*</label>
                        <input className='update-intro-input' id='city' type="text" value={locationcity} />
                    </div>
                    <button
                        type='submit'
                        className='update-about-save-button'>Save
                    </button>
                </form>

            </div>
        </Modal>
    )
};

export default UpdateProfileModal;