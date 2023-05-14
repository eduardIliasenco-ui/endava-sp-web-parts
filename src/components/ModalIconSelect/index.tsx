import React, { useMemo } from 'react';
import styles from './ModalSelect.module.scss';
import iconStyles from '../../icons/style.module.scss';
import { IModalIconSelectProps } from './ModalIconSelect.types';
import { IconVariant } from '../../icons/Icon.constants';
import { ReactElement } from 'react';

const ModalIconSelect = ({ onSelect, onClose }: IModalIconSelectProps): ReactElement => {
    const options = useMemo(() => {
        const keys = Object.keys(IconVariant);

        return keys.map((key: keyof typeof IconVariant) => (
            <button
                key={key}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelect?.(IconVariant[key]);
                }}
                className={styles['modal-icon-select__select-option']}
            >
                <div
                    className={`${iconStyles.icon} ${styles['--font-size24']} ${IconVariant[key]}`}
                />
                <span className={styles['modal-icon-select__title']}>{key}</span>
            </button>
        ));
    }, [onSelect]);

    return (
        <section onClick={onClose} className={styles['modal-icon-select__wrapper']}>
            <section className={styles['modal-icon-select']}>
                <div className={styles['modal-icon-select__inner']}>
                    {options}
                </div>
            </section>
        </section>
    );
};

export default ModalIconSelect;