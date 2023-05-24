import { LinkVariants } from "./components/Link/Link.constants";

const verticalButtonImage = require('./assets/vertical-button.png');
const backgroundButtonImage = require('./assets/background-button.png');
const curlyArrowButtonImage = require('./assets/curly-arrow-button.png');
const outlineButtonImage = require('./assets/outline-button.png');
const ghostButtonImage = require('./assets/ghost-button.png');

export enum LinkFieldVariant {
  LinkText = 'linkText',
  LinkWhiteText = 'linkWhiteText',
  InternalLink = 'internalLink',
  LinkUrl = 'linkUrl',
  LinkTarget = 'linkTarget',
}

export const linkVariantImages = {
  [LinkVariants.Background]: backgroundButtonImage,
  [LinkVariants.Bordered]: outlineButtonImage,
  [LinkVariants.GhostArrowLeft]: curlyArrowButtonImage,
  [LinkVariants.GhostArrowRight]: ghostButtonImage,
  [LinkVariants.VerticalBlock]: verticalButtonImage,
};
