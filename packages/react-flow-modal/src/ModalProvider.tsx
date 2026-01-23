import React, { FC, PropsWithChildren, useState } from "react";
import { ModalContext } from "./modalContext";

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [stack, setStack] = useState<React.ReactNode[]>([]);

    return (
        <ModalContext.Provider value={{ stack, setStack }}>
            {children}
        </ModalContext.Provider>
    );
};