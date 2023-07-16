import csrfFetch from "./csrf"
import { receiveExperience, removeExperience } from "./user";

export const createExperience = experienceInfo => async dispatch => {
    const res = csrfFetch('api/experiences', {
        method: 'POST',
        body: JSON.stringify({ experience: experienceInfo })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveExperience(data.experience));
    };
};

export const updateExperience = (experienceId, experienceInfo) => async dispatch => {
    const res = csrfFetch(`api/experiences/${experienceId}`, {
        method: 'PATCH',
        body: JSON.stringify({ experience: experienceInfo })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveExperience(data.experience));
    };
};

export const deleteExperience = experienceId => async dispatch => {
    const res = csrfFetch(`api/experiences/${experienceId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(removeExperience(experienceId))
    }
}