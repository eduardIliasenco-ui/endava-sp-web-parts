import { IconVariant } from "../../icons/icons.constants";

export interface IIconSelectProps {
    onSelect: (value: keyof typeof IconVariant) => vaoid;
}