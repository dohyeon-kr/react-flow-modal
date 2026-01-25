import { FC, isValidElement, ReactElement } from 'react';
import { useModalContext } from './useModalContext';

export const ModalHost: FC<{ children?: (modals: ReactElement[]) => React.ReactNode }> = ({ children }) => {
    const { stack } = useModalContext();

    if (!children) return stack.filter(isValidElement);
    return children(stack.filter(isValidElement));
};
