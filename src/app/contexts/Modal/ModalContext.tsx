import { createContext, useContext } from "react";

export const ModalContext = createContext(null);

export const useModalContext = () => {
    const context = useContext(ModalContext);

    if (context === null) {
        throw new Error("You must add a <ModalContext> into the React tree");
    }

    return context;
}