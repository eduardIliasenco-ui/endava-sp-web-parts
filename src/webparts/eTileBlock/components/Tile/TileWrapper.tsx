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
}: PropsWithChildren<ITileWrapperProps>): ReactElement => {
    const className = isEdit ? `${classNames[variant]} ${styles['--no-action']}` : classNames[variant];

    switch (variant) {
        case TileVariant.TextAndButtonUnderCard:
            return (
                <figure className={classNames.textAndButtonUnderCard}>{children}</figure>
            );
        case TileVariant.TextUnderCard:
            return (
                <figure className={classNames.textUnderCard}>{children}</figure>
            );
        default:
            return (
                <a
                    tabIndex={0}
                    target={target}
                    href={url}
                    className={className}
                >
                    {children}
                </a>
            );
    }
};

export default TileWrapper;
