import React, { PropsWithChildren, ReactElement, memo, useMemo } from 'react';
import { LinkVariants, Target, classNames, VARIANT_BASED_ICON } from './Link.constants';
import { ILinkProps } from './Link.types';
import styles from './Link.module.scss';
import Text from '../../../../components/Text';
import { TextWeight } from '../../../../components/Text/Text.constants';
import { TargetOff } from 'ELinkBlockWebPartStrings';

const Link = ({
    url,
    rel,
    text,
    children,
    isEdit,
    isWhiteText,
    target = Target.Blank,
    variant = LinkVariants.GhostArrowLeft,
}: PropsWithChildren<ILinkProps>): ReactElement => {
    const elements = useMemo(() => {
        const isIconLeft = !!(
            variant === LinkVariants.Background
            || variant === LinkVariants.GhostArrowLeft
        );
        const elements = [
            (
                <Text
                    fontWeight={TextWeight.Bold}
                    key={text || url}
                    isWhite={isWhiteText}
                    maxLines={1}
                >
                    {text || children || url}
                </Text>
            ),
            <i key={variant} className={VARIANT_BASED_ICON[variant]} />
        ];

        if (isIconLeft) return elements.reverse();
        return elements;
    }, [children, text, url, variant, isWhiteText, TargetOff]);
    const darkStyle = isWhiteText ? styles['--dark'] : '';
    const className = isEdit
        ? `${classNames[variant]} ${styles['--no-action']} ${darkStyle}`
        : `${classNames[variant]} ${darkStyle}`;
    const classNameDisabled = (text || children) && url
        ? className : `${className} ${styles['--disabled']}`;

    return (
        <a
            tabIndex={0}
            className={classNameDisabled}
            href={url}
            rel={rel}
            target={target}
            data-interception="off"
        >
            {elements}
        </a>
    );
};

export default memo(Link);
