import React, { useMemo } from 'react';
import styles from './ModalSelect.module.scss';
import iconStyles from '../../icons/style.module.scss';
import { IModalIconSelectProps } from './ModalIconSelect.types';
import { IconVariant } from '../../icons/icons.constants';
import { ReactElement } from 'react';
import CloseButton from '../CloseButton';

const ModalIconSelect = ({ onSelect, onClose }: IModalIconSelectProps): ReactElement => {
    const options = useMemo(() => {
        const { IconArrowRight: _, IconCurlyArrow: _1, ...icons } = IconVariant;
        const keys = Object.keys(icons);

        return keys.map((key: keyof typeof IconVariant) => (
            <button
                key={key}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelect?.(key);
                }}
                className={styles['modal-icon-select__select-option']}
            >
                <div
                    className={`${iconStyles.icon} ${styles['--font-size32']} ${IconVariant[key]}`}
                />
            </button>
        ));
    }, [onSelect]);

    return (
        <section onClick={onClose} className={styles['modal-icon-select__wrapper']}>
            <section className={styles['modal-icon-select']}>
                <div className={styles['modal-icon__header']}>
                    <h3>Select an icon</h3>
                    <CloseButton onClick={onClose} />
                </div>
                <div className={styles['modal-icon-select__inner']}>
                    {options}
                </div>
            </section>
        </section>
    );
};

export default ModalIconSelect;
