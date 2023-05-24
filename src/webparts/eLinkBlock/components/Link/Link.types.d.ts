import { LinkVariants, Target } from './Link.constants';

export interface ILinkProps { 
    url: string;
    rel?: string;
    text?: string;
    target?: Target;
    variant?: LinkVariants;
    isEdit?: boolean;
    isWhiteText?: boolean;
}
