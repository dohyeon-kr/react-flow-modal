import React, { FC, Fragment } from 'react';
import { useModalContext } from './useModalContext';

/** @deprecated use renderModals instead */
export const ModalHost: FC = () => {
    const { stack } = useModalContext();

    return (
        <Fragment>
            {stack.map((item) => (item))}
        </Fragment>
    );
};
