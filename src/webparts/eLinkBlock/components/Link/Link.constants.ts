import styles from './Link.module.scss';

export enum LinkVariants {
    Bordered = 'bordered',
    Background = 'background',
    GhostArrowRight = 'ghostArrowRight',
    GhostArrowLeft = 'ghostArrowLeft',
    GhostCurlyArrowLeft = 'ghostCurlyArrowLeft',
    VerticalBlock = 'verticalBlock',
    TranslatedIcon = 'translatedIcon',
}

export enum Target {
    Blank = '_blank',
    Self = '_self',
    Parent = '_parent',
    Top = '_top',
}

export const bordered = [styles.link, styles['link--bordered']].join(' ');

export const background = [styles.link, styles['link--white-bg']].join(' ');

export const ghostArrowLeft = styles.link;

export const ghostArrowRight = ghostArrowLeft;

export const ghostCurlyArrowLeft = ghostArrowLeft;

export const verticalBlock = [styles.link, styles['link--block']].join(' ');

export const translatedIcon = [styles.link, styles['icon--y-translated-3']].join(' ');

export const classNames: Record<LinkVariants, string> = {
    bordered,
    background,
    translatedIcon,
    ghostArrowLeft,
    ghostArrowRight,
    ghostCurlyArrowLeft,
    verticalBlock,
};