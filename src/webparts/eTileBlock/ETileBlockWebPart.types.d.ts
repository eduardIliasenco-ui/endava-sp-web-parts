export interface IPageMetaData {
    id: string;
    uri: string;
    type: string;
}

export interface ICreatedBy {
    __deferred: {
        uri: string;
    };
}

export interface ILastModifiedBy {
    __deferred: {
        uri: string;
    };
}

export interface ITranslations {
    __deferred: {
        uri: string;
    };
}

export interface IPath {
    __metadata: {
        type: string;
    };
    DecodedUrl: string;
}

export interface IVersionInfo {
    __metadata: {
        type: string;
    };
    LastVersionCreated: string;
    LastVersionCreatedBy: string;
}

export interface ISitePage {
    __metadata: IPageMetaData;
    CreatedBy: ICreatedBy;
    LastModifiedBy: ILastModifiedBy;
    Translations: ITranslations;
    AbsoluteUrl: string;
    AuthorByline: string;
    BannerImageUrl: string;
    BannerThumbnailUrl: string;
    CallToAction: string;
    Categories: string;
    ContentTypeId: string;
    Description: string;
    DoesUserHaveEditPermission: boolean;
    FileName: string;
    FirstPublished: string;
    Id: number;
    IsPageCheckedOutToCurrentUser: boolean;
    IsWebWelcomePage: boolean;
    Modified: string;
    PageLayoutType: string;
    Path: IPath;
    PromotedState: number;
    Title: string;
    TopicHeader: string;
    UniqueId: string;
    Url: string;
    Version: string;
    VersionInfo: IVersionInfo;
    AlternativeUrlMap: string;
    CanvasContent1: string;
    CoAuthState: string;
    Language: string;
    LayoutWebpartsContent: string;
    SitePageFlags: string;
}

export interface IETileBlockWebPartProps {
  numberOfTiles: string;
  variant: TileVariant;
  [key: string]: string;
}
