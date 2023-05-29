import { MouseEventHandler } from "react";
import { IconVariant } from "../../icons/icons.constants";

export interface IModalIconSelectProps {
    onSelect: (value: keyof typeof IconVariant) => void;
    onClose: MouseEventHandler<HTMLElement>;
}