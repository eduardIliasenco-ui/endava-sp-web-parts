import React, { ReactElement } from 'react';
import { IHeroProps } from './Hero.types';
import styles from './Hero.module.scss';

const Hero = ({ imageSrc, title, description, imagePositionX = 50, imagePositionY = 50 }: IHeroProps): ReactElement => (
  <header
    style={{
      backgroundImage: `url(${imageSrc})`,
      backgroundPositionX: `${imagePositionX}%`,
      backgroundPositionY: `${imagePositionY}%`,
    }}
    className={styles.hero}
  >
    <div className={styles.hero__inner}>
      <h1 className={styles.hero__title}>
        {title}
      </h1>

      <p className={styles.hero__text}>
        {description}
      </p>
    </div>
  </header>
);

export default Hero;