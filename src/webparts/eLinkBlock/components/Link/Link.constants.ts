import styles from './Link.module.scss';
import iconStyles from '../../../../icons/style.module.scss';
import commonIconStyles from '../../../../icons/common-icons.module.scss';

export enum LinkVariants {
    Bordered = 'bordered',
    Background = 'background',
    GhostArrowRight = 'ghostArrowRight',
    GhostArrowLeft = 'ghostArrowLeft',
    VerticalBlock = 'verticalBlock',
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

export const ghostArrowRight = [styles.link, styles['link--small']].join(' ');

export const verticalBlock = [styles.link, styles['link--block']].join(' ');

const rightArrow = [
    iconStyles.icon,
    iconStyles['icon-arrow-right'],
    commonIconStyles['--font-size24']
].join(' ');

const curlyArrow = [
    iconStyles.icon,
    iconStyles['icon-curly-arrow'],
    commonIconStyles['--font-size24']
].join(' ');

export const VARIANT_BASED_ICON = {
    [LinkVariants.Bordered]: rightArrow,
    [LinkVariants.Background]: curlyArrow,
    [LinkVariants.GhostArrowRight]: rightArrow,
    [LinkVariants.VerticalBlock]: rightArrow,
    [LinkVariants.GhostArrowLeft]: curlyArrow,
};

export const classNames: Record<LinkVariants, string> = {
    bordered,
    background,
    ghostArrowLeft,
    ghostArrowRight,
    verticalBlock,
};
