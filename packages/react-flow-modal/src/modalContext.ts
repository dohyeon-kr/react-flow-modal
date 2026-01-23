import { createContext, Dispatch, SetStateAction } from "react";

export const ModalContext = createContext<{
    stack: React.ReactNode[];
    setStack: Dispatch<SetStateAction<React.ReactNode[]>>
}>({
    stack: [],
    setStack: () => [] as React.ReactNode[],
});