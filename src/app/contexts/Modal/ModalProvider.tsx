import React, { useState } from "react";
import { ModalContext } from "./ModalContext";
import _ from "lodash";

export const ModalProvider: React.FC = props => {
    const { children } = props;
    
    const [currentModal, setCurrentModal] = useState<string>(null);
    const [modalData, setModalData] = useState(null);

    const openModal = event => modal => data => callback => {
        
        typeof callback == "function"  && callback();

        if (modal) setCurrentModal(modal);
        if (data) setModalData(data);
    }

    const closeModal = callback => {

        typeof callback == "function"  && callback();

        setCurrentModal(null);
        setModalData(null);
    };

    const openModalCurry = _.curry(openModal);
    const closeModalCurry = _.curry(closeModal);

    const provider = {
        current: currentModal,
        data: modalData,
        open: openModalCurry,
        close: closeModalCurry
    }

    return <ModalContext.Provider value={provider}>{children}</ModalContext.Provider>
}