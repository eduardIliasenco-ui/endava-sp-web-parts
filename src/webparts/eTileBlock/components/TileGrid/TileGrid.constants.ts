import { TileVariant } from '../Tile/Tile.constants';
import styles from './TileGrid.module.scss';

export const arrowedText = [styles['card-wrapper'], styles['card-wrapper--arrowed']].join(' ');

export const iconText = styles['card-wrapper'];

export const textUnderCard = styles['card-wrapper'];

export const textAndButtonUnderCard = styles['card-wrapper'];

export const classNames: Record<TileVariant, string> = {
    arrowedText,
    iconText,
    textUnderCard,
    textAndButtonUnderCard,
};
