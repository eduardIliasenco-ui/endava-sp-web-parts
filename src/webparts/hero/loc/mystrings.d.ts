declare interface IHeroWebPartStrings {
  DescriptionFieldLabel: string;
  TitleFieldLabel: string;
  ImageURLFieldLabel: string;
}

declare module 'HeroWebPartStrings' {
  const strings: IHeroWebPartStrings;
  export = strings;
}
