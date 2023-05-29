import React, { ReactElement } from 'react';
import { ICloseButtonProps } from './CloseButton.types';
import styles from './CloseButton.module.scss';

const CloseButton = ({
    onClick
}: ICloseButtonProps): ReactElement => (
    <button
        className={styles['close-button']}
        onClick={onClick}
    />
);

export default CloseButton;
