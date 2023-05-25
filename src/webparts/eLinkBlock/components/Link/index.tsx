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
        const isIconLeft = !!(variant === LinkVariants.GhostArrowLeft
            || variant === LinkVariants.Bordered);
        const elements = [
            (
                <Text
                    fontWeight={TextWeight.Bold}
                    key={text || url}
                    isWhite={isWhiteText}
                >
                    {text || children || url}
                </Text>
            ),
            <i key={variant} className={VARIANT_BASED_ICON[variant]} />
        ];

        if (isIconLeft) return elements.reverse();
        return elements;
    }, [children, text, url, variant, isWhiteText, TargetOff]);
    const className = isEdit ? `${classNames[variant]} ${styles['--no-action']}` : classNames[variant];
    const classNameDisabled = (text || children) && url ? className : `${className} ${styles['--disabled']}`;

    return (
        <a
            tabIndex={0}
            className={classNameDisabled}
            href={url}
            rel={rel}
            target={target}
        >
            {elements}
        </a>
    );
};

export default memo(Link);
