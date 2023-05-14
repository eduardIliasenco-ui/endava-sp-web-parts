declare interface IETileBlockWebPartStrings {
  URL: string;
  Text: string;
  Title: string;
  Target: string;
  Variant: string;
  LinkText: string;
  ImageUrl: string;
  bordered: string;
  background: string;
  ExternalLink: string;
  NumberOfTiles: string;
  verticalBlock: string;
  TileGroupName: string;
  ghostArrowLeft: string;
  ghostArrowRight: string;
  ghostCurlyArrowLeft: string;
}

declare module 'ETileBlockWebPartStrings' {
  const strings: IETileBlockWebPartStrings;
  export = strings;
}
