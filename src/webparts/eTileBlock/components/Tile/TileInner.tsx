import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './Tile.module.scss';

const TileInner = ({ children, className }: PropsWithChildren<{ className?: string }>): ReactElement => (
    <div className={className || styles['card-inner']}>{children}</div>
);

export default TileInner;
