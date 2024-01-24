declare interface IELinkBlockWebPartStrings {
  Title: string;
  Text: string;
  LinkText: string;
  ImageUrl: string;
  Target: string;
  TargetOn: string;
  TargetOff: string;
  NumberOfLinks: string;
  ExternalLink: string;
  URL: string;
  Variant: string;
  verticalBlock: string;
  LinkGroupName: string;
  CommonLinkConfig: string;
  InternalSiteLink: string;
  SectionDescription: string;
  bordered: string;
  background: string;
  ghostArrowRight: string;
  ghostArrowLeft: string;
  verticalBlock: string;
  WhiteText: string;
  Yes: string;
  No: string;
  RemoveLink: string;
}

declare module 'ELinkBlockWebPartStrings' {
  const strings: IELinkBlockWebPartStrings;
  export = strings;
}
