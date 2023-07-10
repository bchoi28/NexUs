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
        document.body.style.overflow = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            id: currentUser.id,
            fname: firstName,
            lname: lastName,
            pronouns: proNouns,
            headline: headLine,
            locationCountryRegion: locationcountryregion,
            locationCity: locationcity,
        }

        await dispatch(updateUser(user));
        dispatch(closeModal())
        setIsOpen(false);
    }

    return (
        <Modal
            className='modal-custom intro-custom'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
            onRequestClose={handleClose}
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
                        <input className='update-intro-input' required id='firstName' type="text" value={firstName} onChange={handlefName} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="lastName">Last name*</label>
                        <input className='update-intro-input' required id='lastName' type="text" value={lastName} onChange={handlelName} />
                    </div>
                    <div className='update-intro-pronouns-container'>
                        <label className='update-intro-label' htmlFor="pronouns">Pronouns</label>
                        <input className='update-intro-input' id='pronouns' type="text" value={proNouns} onChange={handlePronouns} />
                        <label className='update-intro-pronouns-label' htmlFor="pronouns">Let others know how to refer to you.</label>
                    </div>
                    <div className='update-intro-headline-container'>
                        <label className='update-intro-label' htmlFor="headline">Headline*</label>
                        <input className='update-intro-input' id='headline' required type="text" value={headLine} onChange={handleHeadline} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="country/region">Country/Region*</label>
                        <input className='update-intro-input' id='country/region' required type="text" value={locationcountryregion} onChange={handleLocationCountryRegion} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="city">City*</label>
                        <input className='update-intro-input' id='city' type="text" required value={locationcity} onChange={handleLocationCity} />
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