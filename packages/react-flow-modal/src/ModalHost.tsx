import { FC, isValidElement, ReactElement } from 'react';
import { useModalStore } from './ModalProvider';


export const ModalHost: FC<{ children?: (modals: ReactElement[]) => React.ReactNode }> = ({ children }) => {
    const stack = useModalStore(
        (state) => state.stack
    );


    if (!children) return Array.from(stack.values());
    return children(Array.from(stack.values()));
};
