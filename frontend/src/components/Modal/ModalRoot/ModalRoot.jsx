import { useSelector } from "react-redux";
import { getModalInfo } from "../../../store/modal";
import UpdateAboutModal from "../UpdateAboutModal";
import UpdateCoverPhoto from "../UpdateCoverPhoto";
import LikeCountModal from "../LikeCountModal";
import UpdateProfileModal from "../UpdateProfileModal";
import UpdateExperienceModal from "../Experience/UpdateExperienceModal";
import AddExperienceModal from "../Experience/AddExperienceModal";

const ModalRoot = () => {
    const modalInfo = useSelector(getModalInfo);


    if (modalInfo.modalType === 'UpdateAboutModal') {
        return <UpdateAboutModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateCoverPhoto') {
        return <UpdateCoverPhoto {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'LikeCountModal') {
        return <LikeCountModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateProfileModal') {
        return <UpdateProfileModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateExperienceModal') {
        return <UpdateExperienceModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'AddExperienceModal') {
        return <AddExperienceModal {...modalInfo.modalProps} />
    } else return null;
}

export default ModalRoot;