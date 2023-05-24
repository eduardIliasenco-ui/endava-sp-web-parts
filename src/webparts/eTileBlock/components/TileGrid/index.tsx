import React, { PropsWithChildren, ReactElement } from 'react';
import tileGridStyles from './TileGrid.module.scss';
import { ITileGridProps } from './TileGrid.types';
import { classNames } from './TileGrid.constants';
import { TileVariant } from '../Tile/Tile.constants';

const TileGrid = ({ children, columns, variant = TileVariant.ArrowedText }: PropsWithChildren<ITileGridProps>): ReactElement => {
    const className = columns
        ? `${classNames[variant]} ${(tileGridStyles as any)[`card-wrapper--${columns}col`]}`
        : classNames[variant];

    return (
        <section className={className}>
            {children}
        </section>
    );
};

export default TileGrid;
