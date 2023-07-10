import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './ExperienceItem.css';
import React from 'react';
import { getSessionUser } from '../../store/session';
import { getUser } from '../../store/user';
import { openModal } from '../../store/modal';


const ExperienceItem = React.memo(() => {

    const dispatch = useDispatch();

    const currentUser = useSelector(getSessionUser);
    const profileUser = useSelector(getUser);

    const handleEditExperience = (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'

        dispatch(openModal('UpdateExperiencesModal', { about: profileUser.about }))
    }

    const experienceEditIcon = (currentUser.id === parseInt(id)) ?
        <i onClick={handleEditExperience} class="edit-experience-button fa-solid fa-pencil"></i> : null;

    return (
        <div></div>
    )
})

export default ExperienceItem;