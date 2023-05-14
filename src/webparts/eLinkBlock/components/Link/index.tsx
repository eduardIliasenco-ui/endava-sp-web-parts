import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import { LinkVariants, Target, classNames, translatedIcon } from './Link.constants';
import { ILinkProps } from './Link.types';
import styles from './Link.module.scss';

const Link = ({
    url,
    rel,
    text,
    children,
    isEdit,
    target = Target.Blank,
    variant = LinkVariants.GhostArrowLeft,
}: PropsWithChildren<ILinkProps>): ReactElement => {
    const elements = useMemo(() => {
        const isIconRight = !!(variant === LinkVariants.GhostArrowRight
            || variant === LinkVariants.Bordered);
        const iconClassName = variant === LinkVariants.GhostCurlyArrowLeft
            ? translatedIcon : 'icon';
        const elements = [
            (<span>{text || children || url}</span>),
            (<svg className={iconClassName} width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.6662 4.64245L15.6386 0.35512C15.1938 -0.118373 14.4724 -0.118373 14.0276 0.35512C13.5828 0.828613 13.5828 1.59656 14.0276 2.07005L16.1106 4.28738L4.55669 4.28729C4.24205 4.28729 3.9573 4.42303 3.75117 4.64245L3.29983 5.12786C3.17514 5.2606 3.01145 5.3268 2.84793 5.32628C2.68449 5.32688 2.52081 5.26069 2.39603 5.12786L1.9447 4.64245C1.73856 4.42303 1.45373 4.28738 1.13917 4.28729C0.510058 4.28729 9.5374e-09 4.83024 9.5374e-09 5.49992C-8.05323e-05 6.16969 0.509978 6.71263 1.13917 6.71255C1.45381 6.71255 1.73856 6.57681 1.9447 6.35739L2.39603 5.87197C2.52073 5.73924 2.68441 5.67304 2.84793 5.67356C3.01145 5.67304 3.17506 5.73915 3.29983 5.87197L3.75117 6.35739C3.9573 6.57681 4.24205 6.71255 4.55669 6.71255L16.1106 6.71246L14.0276 8.92979C13.5828 9.40328 13.5828 10.1712 14.0276 10.6447C14.4728 11.1186 15.1938 11.1182 15.6386 10.6447L19.6662 6.35739C20.111 5.88389 20.1115 5.11637 19.6662 4.64245Z"
                    fill="#DE411B" />
            </svg>)
        ];

        if (isIconRight) return elements.reverse();
        return elements;
    }, [children, text, url, variant]);
    const className = isEdit ? `${classNames[variant]} ${styles['--no-action']}` : classNames[variant];

    return (
        <a className={className} href={url} rel={rel} target={target}>
            {elements}
        </a>
    );
};

export default Link;