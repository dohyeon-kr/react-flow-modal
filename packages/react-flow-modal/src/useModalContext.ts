import { useContext } from "react";
import { ModalContext } from "./modalContext";

export const useModalContext = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }

    return context;
};

export const useModalHost = () => {
    const { stack } = useModalContext();

    return {
        render: () => stack.map((item) => (item)),
    };
};