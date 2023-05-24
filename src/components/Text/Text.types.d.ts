import { TextElementType, TextWeight } from "./Text.constants";

export interface ITextProps {
    isWhite?: boolean;
    maxLines?: number;
    fontSize?: number;
    lineHeight?: number | string;
    fontWeight?: TextWeight;
    asElementType?: TextElementType;
}
