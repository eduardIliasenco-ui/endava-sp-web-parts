import React, { ReactElement, memo, useMemo } from 'react';
import { TileVariant } from './Tile.constants';
import { ITileProps } from './Tile.types';
import styles from './Tile.module.scss';
import { LinkVariants } from '../../../eLinkBlock/components/Link/Link.constants';
import TileWrapper from './TileWrapper';
import TileInner from './TileInner';
import iconStyles from '../../../../icons/style.module.scss';
import { IconVariant } from '../../../../icons/icons.constants';
import IconSelect from '../../../../components/IconSelect';
import Link from '../../../eLinkBlock/components/Link';
import Text from '../../../../components/Text';
import { TextWeight } from '../../../../components/Text/Text.constants';
import commonIconStyles from '../../../../icons/common-icons.module.scss';

const Tile = ({
    linkText,
    imageUrl,
    title,
    text,
    target,
    url,
    isEdit,
    onIconSelect,
    variant = TileVariant.IconText,
    icon = 'IconBookmark',
}: ITileProps): ReactElement => {
    const tyleInner = useMemo(() => {
        const iconValue = IconVariant[icon];

        switch (variant) {
            case TileVariant.ArrowedText:
                return (
                    <TileInner className={`${styles['card-inner']} ${styles['--arrowed']}`}>
                        <Text
                            fontSize={24}
                            lineHeight="32px"
                            fontWeight={TextWeight.Bold}
                        >
                            {text}
                        </Text>
                        <i
                            className={`${iconStyles.icon} ${commonIconStyles['--font-size24']} ${iconStyles['icon-arrow-right']}`}
                        />
                    </TileInner>
                );
            case TileVariant.IconText:
                return (
                    <TileInner>
                        <div className="icon-wrapper">
                            {
                                isEdit ? (
                                    <IconSelect onSelect={onIconSelect}>
                                        <i
                                            className={`${iconStyles.icon} ${commonIconStyles['--font-size32']} ${iconValue}`}
                                        />
                                    </IconSelect>
                                ) : <i
                                    className={`${iconStyles.icon} ${commonIconStyles['--font-size32']} ${iconValue}`}
                                />
                            }
                        </div>
                        <Text
                            fontSize={16}
                            lineHeight="24px"
                            fontWeight={TextWeight.Bold}
                        >
                            {text}
                        </Text>
                    </TileInner>
                );
            case TileVariant.TextUnderCard:
                return (
                    <>
                        <TileInner>
                            <div className="icon-wrapper">
                                {
                                    isEdit ? (
                                        <IconSelect onSelect={onIconSelect}>
                                            <i className={`${iconStyles.icon} ${commonIconStyles['--font-size68']} ${iconValue}`} />
                                        </IconSelect>
                                    ) : <i className={`${iconStyles.icon} ${commonIconStyles['--font-size68']} ${iconValue}`} />
                                }
                            </div>
                        </TileInner>

                        <h3 className={styles['card-title']}>{title}</h3>

                        <Text
                            maxLines={4}
                            fontSize={16}
                            fontWeight={TextWeight.Normal}
                        >
                            {text}
                        </Text>
                    </>
                );
            case TileVariant.TextAndButtonUnderCard:
                return (
                    <>
                        <div>
                            <img className={styles['card-figiure-image']} src={imageUrl} alt="" />

                            <h6 className={`${styles['card-title']} ${styles['card-title--2lines']}`}>
                                {title}
                            </h6>

                            <Text
                                maxLines={6}
                                fontSize={16}
                                fontWeight={TextWeight.Normal}
                            >
                                {text}
                            </Text>
                        </div>

                        <Link
                            url={url}
                            target={target}
                            isEdit={isEdit}
                            variant={LinkVariants.GhostArrowRight}
                        >
                            {linkText}
                        </Link>
                    </>
                );
            default:
                return <></>;
        }
    }, [variant, text, title, target, icon, url, linkText, imageUrl, onIconSelect]);

    return (
        <TileWrapper
            url={url}
            target={target}
            isEdit={isEdit}
            variant={variant}
            disabled={!text || !url}
        >
            {tyleInner}
        </TileWrapper>
    );
};

export default memo(Tile);
