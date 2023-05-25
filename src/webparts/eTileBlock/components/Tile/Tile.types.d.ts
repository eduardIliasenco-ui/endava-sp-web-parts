import { ReactElement } from 'react';
import { TileVariant } from './Tile.constants';
import { IconVariant } from '../../../../icons/icons.constants';

export interface ITileWrapperProps {
    url?: string;
    variant: TileVariant;
    target?: Target;
    isEdit?: boolean;
    disabled?: boolean;
}

export interface ITileProps {
    url?: string;
    text?: string;
    title?: string;
    imageUrl?: string;
    linkText?: string;
    icon?: keyof typeof IconVariant;
    variant?: TileVariant;
    target?: Target;
    isEdit?: boolean;
    onIconSelect?: (value: iconVariant) => void;
}
