import React, { ReactElement, useMemo } from 'react';
import { TileVariant } from './Tile.constants';
import { ITileProps } from './Tile.types';
import styles from './Tile.module.scss';
import { LinkVariants } from '../../../eLinkBlock/components/Link/Link.constants';
import TileWrapper from './TileWrapper';
import TileInner from './TileInner';
import iconStyles from '../../../../icons/style.module.scss';
import { IconVariant } from '../../../../icons/Icon.constants';
import IconSelect from '../../../../components/IconSelect';
import Link from '../../../eLinkBlock/components/Link';

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
    icon = IconVariant.IconArrowRight,
}: ITileProps): ReactElement => {
    const tyleInner = useMemo(() => {
        switch (variant) {
            case TileVariant.ArrowedText:
                return (
                    <TileInner className={`${styles['card-inner']} ${styles['--arrowed']}`}>
                        <span className={styles['card-text']}>{text}</span>
                        {
                            isEdit ? (
                                <IconSelect onSelect={onIconSelect}>
                                    <div
                                        className={`${iconStyles.icon} ${styles['--font-size24']} ${icon}`}
                                    />
                                </IconSelect>
                            ) : <div
                                className={`${iconStyles.icon} ${styles['--font-size24']} ${icon}`}
                            />
                        }
                    </TileInner>
                );
            case TileVariant.IconText:
                return (
                    <TileInner>
                        <div className="icon-wrapper">
                            {
                                isEdit ? (
                                    <IconSelect onSelect={onIconSelect}>
                                        <div
                                            className={`${iconStyles.icon} ${styles['--font-size32']} ${icon}`}
                                        />
                                    </IconSelect>
                                ) : <div
                                    className={`${iconStyles.icon} ${styles['--font-size32']} ${icon}`}
                                />
                            }
                        </div>
                        <span className={styles['card-text']}>{text}</span>
                    </TileInner>
                );
            case TileVariant.IconOnly:
                return (
                    <TileInner>
                        <div className="icon-wrapper">
                            {
                                isEdit ? (
                                    <IconSelect onSelect={onIconSelect}>
                                        <div
                                            className={`${iconStyles.icon} ${styles['--font-size68']} ${styles['--font-size24']} ${icon}`}
                                        />
                                    </IconSelect>
                                ) : <div
                                    className={`${iconStyles.icon} ${styles['--font-size68']} ${styles['--font-size24']} ${icon}`}
                                />
                            }
                        </div>
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
                                            <div className={`${iconStyles.icon} ${styles['--font-size32']} ${icon}`} />
                                        </IconSelect>
                                    ) : icon
                                }
                            </div>
                        </TileInner>

                        <h2 className={styles['card-title']}>{title}</h2>

                        <span className={styles['card-text']}>{text}</span>
                    </>
                );
            case TileVariant.TextAndButtonUnderCard:
                return (
                    <>
                        <div>
                            <img className={styles['card-figiure-image']} src={imageUrl} alt="" />

                            <h3 className={styles['card-title--2lines']}>
                                {title}
                            </h3>

                            <span className={`${styles['card-text']} ${styles['card-text--3lines']}`}>
                                {text}
                            </span>

                        </div>

                        <Link
                            target={target}
                            url={url}
                            variant={LinkVariants.GhostCurlyArrowLeft}
                            isEdit={isEdit}
                        >
                            {linkText}
                        </Link>
                    </>
                );
            default:
                return <></>;
        }
    }, [variant, text, title, icon, url, linkText, imageUrl, onIconSelect]);

    return (
        <TileWrapper url={url} variant={variant} isEdit={isEdit}>
            {tyleInner}
        </TileWrapper>
    );
};

export default Tile;