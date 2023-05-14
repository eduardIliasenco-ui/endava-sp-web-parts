import styles from './Tile.module.scss';

export enum TileVariant {
    ArrowedText = 'arrowedText',
    IconText = 'iconText',
    IconOnly = 'iconOnly',
    TextUnderCard = 'textUnderCard',
    TextAndButtonUnderCard = 'textAndButtonUnderCard',
}

export enum TileFieldVariant {
    TileTitle = 'tileTitle',
    TileText = 'tileText',
    TileUrl = 'tileUrl',
    TileLinkText = 'tileLinkUrl',
    ImageUrl = 'imageUrl',
    IsExternalLink = 'isExternalLink',
    Target = 'target',
    TileIcon = 'tileIcon',
}

export const arrowedText = [styles.card, styles['card--arrowed']].join(' ');

export const iconText = styles.card;

export const iconOnly = styles.card;

export const textUnderCard = [styles.card, styles['card--figure'], styles['card--large']].join(' ');

export const textAndButtonUnderCard = [styles.card, styles['card--figure'], styles['--space-between']].join(' ');

export const CARDS_WITH_TITLE = [TileVariant.TextAndButtonUnderCard, TileVariant.TextUnderCard];

export const CARDS_WITH_TEXT = [
    TileVariant.TextAndButtonUnderCard,
    TileVariant.TextUnderCard,
    TileVariant.IconText,
    TileVariant.ArrowedText,
];

export const classNames = {
    arrowedText,
    iconText,
    iconOnly,
    textUnderCard,
    textAndButtonUnderCard,
};