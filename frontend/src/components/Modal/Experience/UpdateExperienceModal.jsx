import './UpdateExperienceModal.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modal';
import { useState } from 'react';
import { updateUser } from '../../../store/user';
import { getSessionUser } from '../../../store/session';

const UpdateExperienceModal = ({ experienceInfo }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser)

    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState(experienceInfo.title);
    const [companyName, setCompanyName] = useState(experienceInfo.companyName);
    const [employmentType, setEmploymentType] = useState(experienceInfo.employmentType);
    const [location, setLocation] = useState(experienceInfo.location);
    const [locationType, setLocationType] = useState(experienceInfo.locationType);

    const [currentRoleChecked, setCurrentRoleChecked] = useState(experienceInfo.convertedEndDate === 'Current');

    const [startMonth, startYear] = experienceInfo.convertedStartDate.split(' ');
    const [selectedStartMonth, setSelectedStartMonth] = useState(startMonth);
    const [selectedStartYear, setSelectedStartYear] = useState(startYear);

    const [endMonth, endYear] = experienceInfo.convertedEndDate.split(' ');
    const [selectedEndMonth, setSelectedEndMonth] = useState(endMonth);
    const [selectedEndYear, setSelectedEndYear] = useState(endYear);
    debugger
    const [description, setDescription] = useState(experienceInfo.description);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    }
    const handleEmploymentType = (e) => {
        setEmploymentType(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleLocationType = (e) => {
        setLocationType(e.target.value);
    }

    const handleCheckbox = (e) => {
        setCurrentRoleChecked((prevState) => !prevState);
    }

    const handleStartMonth = (e) => {
        setSelectedStartMonth(e.target.value);
    };
    const handleStartYear = (e) => {
        setSelectedStartYear(e.target.value);
    };

    const handleEndMonth = (e) => {
        setSelectedEndMonth(e.target.value);
    };
    const handleEndYear = (e) => {
        setSelectedEndYear(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeModal())
        setIsOpen(false);
        document.body.style.overflow = '';
    }

    const years = [];
    for (let year = 2023; year >= 1923; year--) years.push(year);
    const yearOptions = years.map(year => {
        return <option key={year} value={year}>{year}</option>
    });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const experience = {

    //     }

    //     await dispatch(updateExperience(experience));
    //     dispatch(closeModal())
    //     setIsOpen(false);
    // }

    return (
        <Modal
            className='modal-custom intro-custom'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
            onRequestClose={handleClose}
        >
            <div className='update-intro-container'>
                <header className='update-intro-header'>
                    <div className='update-intro-title'>Edit experience</div>
                    <div className='update-modal-close-container'>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                </header>
                <form className='update-experience-form-container'>
                    <div className='required'>* indicates required</div>
                    <div>
                        <label className='update-intro-label' htmlFor="title">Title*</label>
                        <input className='update-intro-input' required id='title' type="text" value={title} onChange={handleTitle} />
                    </div>
                    <div className='update-experience-employment-container'>
                        <label className='update-intro-label' htmlFor="employmentType">Employment type</label>
                        <select className='update-experience-employment-type update-intro-input' id='employmentType' value={employmentType} onChange={handleEmploymentType}>
                            <option disabled value="">Please select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Self-employed">Self-employed</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Apprenticeship">Apprenticeship</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="companyName">Company name*</label>
                        <input className='update-intro-input' required id='companyName' type="text" value={companyName} onChange={handleCompanyName} />
                    </div>
                    <div >
                        <label className='update-intro-label' htmlFor="location">Location</label>
                        <input className='update-intro-input' id='location' type="text" value={location} onChange={handleLocation} />
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="locationType">Location type</label>
                        <input className='update-intro-input' id='locationType' required type="text" value={locationType} onChange={handleLocationType} />
                    </div>
                    <div className='update-experience-checkbox-container'>
                        <label className='update-experience-checkbox-label' htmlFor='checkbox'>I am currently working in this role</label>
                        <input
                            className='update-experience-checkbox-input'
                            id='checkbox'
                            type="checkbox"
                            checked={currentRoleChecked}
                            onChange={handleCheckbox}
                        />
                    </div>
                    <div>
                        <label className='update-intro-label' >Start date*</label>
                        <div>
                            <select value={selectedStartMonth} onChange={handleStartMonth}>
                                <option disabled value="">Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                            <select value={selectedStartYear} onChange={handleStartYear}>
                                <option disabled value="">Select year</option>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="endDate">End date*</label>
                        <div>
                            <select value={selectedEndMonth} onChange={handleEndMonth}>
                                <option disabled value="">Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                            <select value={selectedEndYear} onChange={handleEndYear}>
                                <option disabled value="">Year</option>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className='update-intro-label' htmlFor="description">Description</label>
                        <input className='update-intro-input' id='description' type="text" value={description} onChange={handleDescription} />
                    </div>
                    <button
                        type='submit'
                        className='update-about-save-button'>Save
                    </button>
                </form>

            </div>
        </Modal>
    )
}

export default UpdateExperienceModal;