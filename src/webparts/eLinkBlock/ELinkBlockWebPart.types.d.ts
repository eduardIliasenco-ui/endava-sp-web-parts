import { LinkVariants } from './components/Link/Link.constants';

export interface IELinkBlockWebPartProps {
  numberOfLinks: string;
  variant: LinkVariants;
  [key: string]: string;
}