import strings from "ETileBlockWebPartStrings";
import { TileVariant } from "./components/Tile/Tile.constants";

const blogPostImage = require('./assets/blogpost-card.png');
const arrowCardImage = require('./assets/arrow-card.png');
const iconCardImage = require('./assets/icon-card.png');
const textCardImage = require('./assets/text-card.png');

export const tileVariantImages = {
    [TileVariant.ArrowedText]: arrowCardImage,
    [TileVariant.IconText]: iconCardImage,
    [TileVariant.TextAndButtonUnderCard]: blogPostImage,
    [TileVariant.TextUnderCard]: textCardImage,
};

export const tileVariantNames = {
    [TileVariant.ArrowedText]: strings.ArrowCard,
    [TileVariant.IconText]: strings.IconCard,
    [TileVariant.TextAndButtonUnderCard]: strings.BlogPostCard,
    [TileVariant.TextUnderCard]: strings.TextCard,
};
