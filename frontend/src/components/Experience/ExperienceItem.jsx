import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ExperienceItem.css';
import React from 'react';
import { getSessionUser } from '../../store/session';
import { getUser } from '../../store/user';
import { openModal } from '../../store/modal';
import { deleteExperience, updateExperience } from '../../store/experience';

const ExperienceItem = React.memo(({ experience }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    const profileUser = useSelector(getUser);
    const experienceId = experience.id;

    const [title, setTitle] = useState(experience.title);
    const [companyName, setCompanyName] = useState(experience.companyName);
    const [employmentType, setEmploymentType] = useState(experience.employmentType);
    const [location, setLocation] = useState(experience.location);
    const [locationType, setLocationType] = useState(experience.locationType);
    const [industry, setIndustry] = useState(experience.industry);
    const [startDate, setStartDate] = useState(experience.startDate);
    const [endDate, setEndDate] = useState(experience.endDate);
    const [description, setDescription] = useState(experience.description);
    const convertedStartDate = startDate ? new Date(startDate + "T00:00:00").toLocaleDateString('en', { year: 'numeric', month: 'long' }) : '';
    const convertedEndDate = endDate ? new Date(endDate + "T00:00:00").toLocaleDateString('en', { year: 'numeric', month: 'long' }) : 'Current';

    const calculateDuration = (startDate, endDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : today;

        const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        let duration = '';
        if (years > 0) {
            duration += `${years} ${years === 1 ? 'yr' : 'yrs'} `;
        }
        if (months > 0) {
            duration += `${months} ${months === 1 ? 'mo' : 'mos'}`;
        }
        if (duration === '') {
            duration = 'Less than a month';
        }

        return duration;
    };
    const duration = calculateDuration(startDate, endDate);

    const handleEditExperience = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'
        debugger
        const experienceInfo = {
            experienceId, title, companyName, employmentType, location, locationType, industry,
            convertedStartDate, convertedEndDate, description
        }

        dispatch(openModal('UpdateExperienceModal', { experienceInfo: experienceInfo }))
    }

    const experienceEditIcon = (currentUser.id === parseInt(id)) ?
        <i onClick={handleEditExperience} className="edit-experience-button fa-solid fa-pencil"></i> : null;

    return (
        <div className='experience-item-container'>
            <img className='experience-item-image' src='/assets/images/seeds/default-experience-image.png' alt='experience' />
            <div className='experience-item-info'>
                <div className='experience-title'>{title}</div>
                {experienceEditIcon}
                <div className='experience-company-employment'>
                    <div className='experience-company'>{experience.companyName}</div>
                    <div className='experience-employment-type'>{experience.employmentType}</div>
                </div>
                <div className='experience-start-end'> {convertedStartDate} - {convertedEndDate} <span className='experience-duration'>{duration}</span> </div>
                <div className='experience-location'>{experience.location} <span className='experience-location-type'>{experience.locationType} </span></div>
                <div className='experience-description'>{experience.description} </div>
            </div>
        </div>
    )
})

export default ExperienceItem;