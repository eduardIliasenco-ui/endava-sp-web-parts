declare interface IELinkBlockWebPartStrings {
  Title: string;
  Text: string;
  LinkText: string;
  ImageUrl: string;
  Target: string;
  NumberOfLinks: string;
  ExternalLink: string;
  URL: string;
  Variant: string;
  verticalBlock: string;
  LinkGroupName: string;
  InternalSiteLink: string;
}

declare module 'ELinkBlockWebPartStrings' {
  const strings: IELinkBlockWebPartStrings;
  export = strings;
}
