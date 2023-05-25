import React, { PropsWithChildren, ReactElement } from 'react';
import { TileVariant, classNames } from './Tile.constants';
import { ITileWrapperProps } from './Tile.types';
import styles from './Tile.module.scss';

const TileWrapper = ({
    url,
    variant,
    children,
    target,
    isEdit,
    disabled,
}: PropsWithChildren<ITileWrapperProps>): ReactElement => {
    const className = isEdit ? `${classNames[variant]} ${styles['--no-action']}` : classNames[variant];
    const classNameAnchorCard = disabled ? `${className} ${styles['--disabled']}` : className;

    switch (variant) {
        case TileVariant.TextAndButtonUnderCard:
            return (
                <figure
                    className={classNames.textAndButtonUnderCard}
                >
                    {children}
                </figure>
            );
        case TileVariant.TextUnderCard:
            return (
                <figure
                    className={classNames.textUnderCard}
                >
                    {children}
                </figure>
            );
        default:
            return (
                <a
                    href={url}
                    tabIndex={0}
                    target={target}
                    className={classNameAnchorCard}
                >
                    {children}
                </a>
            );
    }
};

export default TileWrapper;
