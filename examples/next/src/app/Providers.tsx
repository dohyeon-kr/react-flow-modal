"use client";

import { AnimatePresence } from "motion/react";
import { ModalHost, ModalProvider } from "react-flow-modal";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalProvider>
            {children}
            <ModalHost>
                {(modals) => (
                    <AnimatePresence>
                        {modals.map((modal) => modal)}
                    </AnimatePresence>
                )}
            </ModalHost>

        </ModalProvider>
    );
};