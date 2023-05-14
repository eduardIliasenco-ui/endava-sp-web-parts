import { IconVariant } from "../../icons/Icon.constants";

export interface IModalIconSelectProps {
    onSelect: (value: iconVariant) => void;
    onClose: () => void;
}