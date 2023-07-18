import './UpdateExperienceModal.css';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../store/modal';
import { useState, useEffect } from 'react';
import { getSessionUser } from '../../../store/session';
import { deleteExperience, updateExperience } from '../../../store/experience';

const UpdateExperienceModal = ({ experienceInfo }) => {

    const dispatch = useDispatch();
    const experienceId = experienceInfo.experienceId;
    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState(experienceInfo.title);
    const [companyName, setCompanyName] = useState(experienceInfo.companyName);
    const [employmentType, setEmploymentType] = useState(experienceInfo.employmentType);
    const [location, setLocation] = useState(experienceInfo.location);
    const [locationType, setLocationType] = useState(experienceInfo.locationType);
    const [industry, setIndustry] = useState(experienceInfo.industry);
    const [currentRoleChecked, setCurrentRoleChecked] = useState(experienceInfo.convertedEndDate === 'Current');
    debugger
    const [startMonth, startYear] = experienceInfo.convertedStartDate.split(' ');
    const [selectedStartMonth, setSelectedStartMonth] = useState(startMonth);
    const [selectedStartYear, setSelectedStartYear] = useState(startYear);

    const [endMonth, endYear] = experienceInfo.convertedEndDate.split(' ');
    const [selectedEndMonth, setSelectedEndMonth] = useState(endMonth);
    const [selectedEndYear, setSelectedEndYear] = useState(endYear);

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
    const handleIndustry = (e) => {
        setIndustry(e.target.value);
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

    const handleClose = () => {
        dispatch(closeModal())
        setIsOpen(false);
        document.body.style.overflow = '';
    }

    const years = [];
    for (let year = 2023; year >= 1923; year--) years.push(year);
    const yearOptions = years.map(year => {
        return <option key={year} value={year}>{year}</option>
    });

    const handleDeleteExperience = (e) => {
        e.preventDefault();
        dispatch(deleteExperience(experienceInfo.experienceId));
        handleClose();
    }

    const formatDateForRails = (month, year) => {
        debugger
        const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1;
        const formattedMonth = String(monthIndex).padStart(2, "0");
        return `${year}-${formattedMonth}-01`;
    };

    const handleUpdateExperience = async (e) => {
        debugger
        e.preventDefault();
        const startDate = formatDateForRails(selectedStartMonth, selectedStartYear);
        let endDate;
        if (currentRoleChecked) {
            endDate = null;
        } else {
            endDate = formatDateForRails(selectedEndMonth, selectedEndYear);
        }

        const experience = {
            title, companyName, employmentType, location, locationType, industry, startDate, endDate, description
        }

        await dispatch(updateExperience(experienceId, experience))
        handleClose();
    }

    useEffect(() => {
        if (!currentRoleChecked && selectedEndMonth === 'Current') {
            setSelectedEndMonth("");
            setSelectedEndYear("");
        }
    }, [currentRoleChecked]);

    return (
        <Modal
            className='modal-custom experience-modal'
            overlayClassName='modal-overlay'
            isOpen={isOpen}
            onRequestClose={handleClose}
        >
            <div className='update-experience-container'>
                <header className='update-intro-header'>
                    <div className='update-intro-title'>Edit experience</div>
                    <div className='update-modal-close-container'>
                        <button type='button' className='update-modal-close' onClick={handleClose} >X</button>
                    </div>
                </header>
                <form className='update-experience-form-container' onSubmit={handleUpdateExperience}>
                    <div className='required'>* indicates required</div>
                    <div>
                        <label className='update-intro-label' htmlFor="title">Title*</label>
                        <input className='update-intro-input update-input-title' required id='title' type="text" value={title} onChange={handleTitle} />
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
                        <input className='update-intro-input update-input-title' required id='companyName' type="text" value={companyName} onChange={handleCompanyName} />
                    </div>
                    <div >
                        <label className='update-intro-label' htmlFor="location">Location</label>
                        <input className='update-intro-input update-input-title' id='location' type="text" value={location} onChange={handleLocation} />
                    </div>
                    <div className='update-experience-locationtype-container'>
                        <label className='update-intro-label' htmlFor="locationType">Location type</label>
                        <select className='update-intro-input update-experience-locationtype' id='locationType' required type="text" value={locationType} onChange={handleLocationType}>
                            <option disabled value="">Please select</option>
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div className='update-experience-checkbox-container'>
                        <input
                            className='update-experience-checkbox-input'
                            id='checkbox'
                            type="checkbox"
                            checked={currentRoleChecked}
                            onChange={handleCheckbox}
                        />
                        <label className='update-experience-checkbox-label' htmlFor='checkbox'>I am currently working in this role</label>
                    </div>
                    <div className='update-date-container' >
                        <label className='update-intro-label update-date-label' >Start date*</label>
                        <div className='update-experience-year-month-container'>
                            <select value={selectedStartMonth} className='update-experience-start-month' onChange={handleStartMonth}>
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
                            <select value={selectedStartYear} className='update-experience-start-year' onChange={handleStartYear}>
                                <option disabled value="">Year</option>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                    {!currentRoleChecked &&
                        <div className='update-date-container'>
                            <label className='update-intro-label' htmlFor="endDate">End date*</label>
                            <div className='update-experience-year-month-container'>
                                <select className='update-experience-end-month' value={selectedEndMonth} onChange={handleEndMonth}>
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
                                <select value={selectedEndYear} className='update-experience-end-year' onChange={handleEndYear}>
                                    <option disabled value="">Year</option>
                                    {yearOptions}
                                </select>
                            </div>
                        </div>}
                    <div className='update-industry-container' >
                        <label className='update-intro-label' htmlFor="industry">Industry*</label>
                        <input className='update-intro-input update-input-title' required id='industry' type="text" value={industry} onChange={handleIndustry} />
                    </div>
                    <div className='update-experience-description-container'>
                        <label className='update-intro-label' htmlFor="description">Description</label>
                        <textarea className='update-intro-input update-input-title update-experience-description ' id='description' type="text" value={description} onChange={handleDescription} />
                    </div>
                    <div className='update-experience-footer'>
                        <button
                            onClick={handleDeleteExperience}
                            className='delete-experience-button'
                            type='button'
                        >Delete Experience
                        </button>
                        <button
                            type='submit'
                            className='update-experience-save-button'>Save
                        </button>
                    </div>
                </form>

            </div>
        </Modal>
    )
}

export default UpdateExperienceModal;