declare interface IHeroWebPartStrings {
  DescriptionFieldLabel: string;
  TitleFieldLabel: string;
  ImageURLFieldLabel: string;
  ImagePositionX: string;
  ImagePositionY: string;
}

declare module 'HeroWebPartStrings' {
  const strings: IHeroWebPartStrings;
  export = strings;
}
