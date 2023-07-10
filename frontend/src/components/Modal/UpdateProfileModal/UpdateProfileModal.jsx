import './UpdateProfileModal.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modal';
import { useState } from 'react';
import { updateUser } from '../../../store/user';
import { getSessionUser } from '../../../store/session';

const UpdateProfileModal = (profileInfo) => {

    const { fName, lName, headline, pronouns, locationCity, locationCountryRegion } = profileInfo;

    return (
        <div>
            <div>{fName}</div>
            <div>{lName}</div>
            <div>{headline}</div>
            <div>{pronouns}</div>
            <div>{locationCity}</div>
            <div>{locationCountryRegion}</div>
        </div>
    )
};

export default UpdateProfileModal;