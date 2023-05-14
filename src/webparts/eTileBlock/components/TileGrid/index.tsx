import React, { PropsWithChildren, ReactElement } from 'react';
import { ITileGridProps } from './TileGrid.types';
import { classNames } from './TileGrid.constants';
import { TileVariant } from '../Tile/Tile.constants';

const TileGrid = ({ children, variant = TileVariant.ArrowedText }: PropsWithChildren<ITileGridProps>): ReactElement => (
    <section className={classNames[variant]}>
        {children}
    </section>
);

export default TileGrid;