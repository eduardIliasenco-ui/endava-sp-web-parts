import React, { PropsWithChildren, ReactElement } from 'react';
import { ILinkGridProps } from './LinkGrid.types';
import * as classNames from './LinkGrid.constants';
import { LinkVariants } from '../Link/Link.constants';

const LinkGrid = ({ children, vertical = false, variant = LinkVariants.GhostArrowRight }: PropsWithChildren<ILinkGridProps>): ReactElement => (
    <section className={!vertical && (classNames as Record<LinkVariants, string>)[variant]}>
        {children}
    </section>
);

export default LinkGrid;