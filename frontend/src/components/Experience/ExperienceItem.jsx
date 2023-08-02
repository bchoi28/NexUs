import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ExperienceItem.css';
import React from 'react';
import { getSessionUser } from '../../store/session';
import { openModal } from '../../store/modal';

const ExperienceItem = ({ experience }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(getSessionUser);
    const experienceId = experience.id;

    const {
        title,
        companyName,
        employmentType,
        location,
        locationType,
        industry,
        startDate,
        endDate,
        description
    } = experience;

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
                    <div className='experience-company'>{companyName}</div>
                    <div className='experience-employment-type'>{employmentType}</div>
                </div>
                <div className='experience-start-end'> {convertedStartDate} - {convertedEndDate} <span className='experience-duration'>{duration}</span> </div>
                <div className='experience-location'>{location} <span className='experience-location-type'>{locationType} </span></div>
                <div className='experience-description'>{description} </div>
            </div>
        </div>
    )
}

export default ExperienceItem;