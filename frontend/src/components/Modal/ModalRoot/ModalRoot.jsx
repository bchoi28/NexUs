import { useSelector } from "react-redux";
import { getModalInfo } from "../../../store/modal";
import UpdateIntroModal from "../UpdateIntroModal/UpdateIntroModal";
import UpdateAboutModal from "../UpdateAboutModal";

const ModalRoot = () => {
    debugger
    const modalInfo = useSelector(getModalInfo);

    if (modalInfo.modalType === 'UpdateIntroModal') {
        return <UpdateIntroModal {...modalInfo.modalProps} />
    } else if (modalInfo.modalType === 'UpdateAboutModal') {
        return <UpdateAboutModal {...modalInfo.modalProps} />
    } else {
        // Render nothing if no modal should be open
        return null;
    }
}

export default ModalRoot;