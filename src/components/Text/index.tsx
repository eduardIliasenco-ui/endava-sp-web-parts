import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './Text.module.scss';
import { TextElementType } from './Text.constants';
import { ITextProps } from './Text.types';

const Text = ({
    children,
    isWhite,
    maxLines,
    lineHeight,
    fontWeight,
    fontSize = 16,
    asElementType = TextElementType.Span,
}: PropsWithChildren<ITextProps>): ReactElement => {
    const classNames = [styles['styled-text']];
    const style = { fontSize, fontWeight, lineHeight };

    if (isWhite) {
        classNames.push(styles['styled-text--white-text']);
    }

    if (maxLines) {
        classNames.push((styles as unknown as any)['styled-text--max-lines']);
        classNames.push((styles as unknown as any)[`styled-text--max-lines${maxLines}`]);
    }

    const className = classNames.join(' ');

    switch (asElementType) {
        case TextElementType.Span:
            return (
                <span
                    style={style}
                    className={className}
                >
                    {children}
                </span>
            );

        default:
            return (
                <p
                    style={style}
                    className={className}
                >
                    {children}
                </p>
            );
    }
};

export default Text;
