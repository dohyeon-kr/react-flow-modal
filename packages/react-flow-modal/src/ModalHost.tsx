import React, { FC, Fragment } from 'react';
import { useModalContext } from './useModalContext';

export const ModalHost: FC = () => {
    const { stack } = useModalContext();

    return (
        <Fragment>
            {stack.map((item) => (item))}
        </Fragment>
    );
};
