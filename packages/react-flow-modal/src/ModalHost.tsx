import { FC, Fragment } from 'react';
import { useModalHost } from './useModalContext';

/** @deprecated use renderModals instead */
export const ModalHost: FC = () => {
    const { render } = useModalHost();

    return (
        <Fragment>
            {render()}
        </Fragment>
    );
};
