import { useSelector } from "react-redux";
import { getModalInfo } from "../../../store/modal";
import UpdateIntroModal from "../UpdateIntroModal/UpdateIntroModal";
import UpdateAboutModal from "../UpdateAboutModal";
import UpdateCoverPhoto from "../UpdateCoverPhoto/UpdateCoverPhoto";

const ModalRoot = () => {
    const modalInfo = useSelector(getModalInfo);

    if (modalInfo.modalType === 'UpdateIntroModal') {
        return <UpdateIntroModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateAboutModal') {
        return <UpdateAboutModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateCoverPhoto') {
        return <UpdateCoverPhoto {...modalInfo.modalProps} />
    } else {
        // Render nothing if no modal should be open
        return null;
    }
}

export default ModalRoot;