import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneChoiceGroupOption,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneGroup,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { update } from '@microsoft/sp-lodash-subset';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ETileBlockWebPartStrings';
import TileGrid from './components/TileGrid';
import { CARDS_WITH_TEXT, CARDS_WITH_TITLE, TileFieldVariant, TileVariant } from './components/Tile/Tile.constants';
import API from '../../utils/API';
import Tile from './components/Tile';
import { IconVariant } from '../../icons/icons.constants';
import { Target } from '../eLinkBlock/components/Link/Link.constants';
import { IETileBlockWebPartProps, ISitePage } from './ETileBlockWebPart.types';
import { tileVariantImages, tileVariantNames } from './ETileBlockWebPart.constants';


export default class ETileBlockWebPart extends BaseClientSideWebPart<IETileBlockWebPartProps> {
  _sitePages: ISitePage[] = [];

  protected get sitePages(): ISitePage[] {
    if (this._sitePages?.length) return this._sitePages;

    this._sitePages = API.getSitePages(this.context);

    return this._sitePages;
  }

  protected async onInit(): Promise<void> {
    this.properties.variant = this.properties.variant || TileVariant.ArrowedText;
  }

  public render(): void {
    const { variant, numberOfTiles = 0 } = this.properties;
    const limitedNumberOfLinks = +numberOfTiles < 99 ? numberOfTiles : 99;
    const tiles = (new Array(+limitedNumberOfLinks || 0).fill(0))
      .map((_, index) => {
        const text = this.properties[this._buildTilePropName(index, TileFieldVariant.TileText)];
        const linkText = this.properties[this._buildTilePropName(index, TileFieldVariant.TileLinkText)];
        const imageUrl = this.properties[this._buildTilePropName(index, TileFieldVariant.ImageUrl)];
        const tileUrl = this.properties[this._buildTilePropName(index, TileFieldVariant.TileUrl)];
        const title = this.properties[this._buildTilePropName(index, TileFieldVariant.TileTitle)];
        const isCurrentTab = this.properties[this._buildTilePropName(index, TileFieldVariant.Target)];
        const target = isCurrentTab ? Target.Self : Target.Blank;
        const iconFieldName = this._buildTilePropName(index, TileFieldVariant.TileIcon);

        return (
          <Tile
            text={text}
            title={title}
            url={tileUrl}
            target={target}
            variant={variant}
            imageUrl={imageUrl}
            linkText={linkText}
            key={`tile-${index}`}
            icon={this.properties[iconFieldName] as keyof typeof IconVariant}
            isEdit={this.displayMode === DisplayMode.Edit}
            onIconSelect={(value) => this.updatePropertyValue(iconFieldName, value)}
          />
        )
      })

    const isIconText = variant === TileVariant.ArrowedText;
    const columns = isIconText && this.properties[this._buildTilePropName(0, TileFieldVariant.IsThreeColumns)] ? 3 : 0;
    const element = (
      <TileGrid
        columns={columns}
        variant={variant}
      >
        {tiles}
      </TileGrid>
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Changes this.properties[fieldName] value to "value"
   * 
   * @prop fieldName
   * @prop value
   * 
   * @returns void
   */
  protected updatePropertyValue(fieldName: string, value: string | (keyof typeof IconVariant)): void {
    update(this.properties, fieldName, () => value);
    this.render();
  }

  /**
   * Loads all the needed date for the Web Part configuration panel
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    this._sitePages = this.sitePages;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Builds link option list for PropertyPaneDropdown from this._sitePages data
   */
  protected buildLinkUrlOptions(): IPropertyPaneDropdownOption[] {
    return this.sitePages
      .map(({ AbsoluteUrl, Title }, index: number) => ({
        key: AbsoluteUrl,
        text: Title,
        index,
        type: 0,
      }));
  }

  /**
     * Builds a link name based on link index
     * 
     * @param index number that represents link index in this.properties
     * @returns field name
     */
  protected _buildTilePropName(
    index: number,
    field: TileFieldVariant = TileFieldVariant.TileText
  ): string {
    return `${field}_${index}`;
  }

  /**
   * Returns a set of options for html anchor target attribute
   * @returns target options
   */
  protected buildLinkTargetOptions(): IPropertyPaneDropdownOption[] {
    return Object.values(Target)
      .map((target: Target, index: number) => ({
        key: target,
        text: target,
        index,
        type: 0,
      }));
  }

  /**
   * Generates tile configuration field set
   * @param numberOfTiles 
   * @returns list of fields
   */
  protected generateTileConfigList(numberOfTiles: number): IPropertyPaneGroup[] {
    return (new Array(+numberOfTiles).fill(1))
      .reduce((previous, _, index) => {
        const tileText = this._buildTilePropName(index, TileFieldVariant.TileText);
        const tileUrl = this._buildTilePropName(index, TileFieldVariant.TileUrl);
        const tileLinkText = this._buildTilePropName(index, TileFieldVariant.TileLinkText);
        const imageUrlName = this._buildTilePropName(index, TileFieldVariant.ImageUrl);
        const isInternalLink = this._buildTilePropName(index, TileFieldVariant.IsInternalLink);
        const linkTarget = this._buildTilePropName(index, TileFieldVariant.Target);
        const tileTitle = this._buildTilePropName(index, TileFieldVariant.TileTitle);
        const isCardWithTitle = CARDS_WITH_TITLE.includes(this.properties.variant);
        const isCardWithText = CARDS_WITH_TEXT.includes(this.properties.variant);
        const isCartWithButton = this.properties.variant === TileVariant.TextAndButtonUnderCard;
        const title = isCardWithTitle
          ? [PropertyPaneTextField(tileTitle, {
            label: strings.Title,
          })] : [];
        const linkText = isCartWithButton ? [
          PropertyPaneTextField(tileLinkText, {
            label: strings.LinkText,
          })
        ] : [];
        const imageUrl = isCartWithButton ? [
          PropertyPaneTextField(imageUrlName, {
            label: strings.ImageUrl,
          })] : [];
        const text = isCardWithText ? [PropertyPaneTextField(tileText, {
          label: strings.Text,
        })] : [];
        const isSite = !!this.sitePages?.length;
        const externalLinkCheckbox = isSite ?
          [
            PropertyPaneCheckbox(isInternalLink, {
              text: strings.InternalLink,
              checked: false,
            })
          ]
          : [];
        const targetCheckbox = this.properties.variant === TileVariant.TextUnderCard ?
          []
          : [PropertyPaneToggle(linkTarget, {
            label: strings.Target,
            onText: strings.Yes,
            offText: strings.No,
            checked: false,
          })];
        const urlField = this.properties[isInternalLink] && isSite ?
          [
            PropertyPaneDropdown(tileUrl, {
              label: isCartWithButton ? strings.LinkURL : strings.URL,
              selectedKey: this.sitePages[0]?.AbsoluteUrl,
              options: this.buildLinkUrlOptions(),
            })
          ]
          : [
            PropertyPaneTextField(tileUrl, {
              label: isCartWithButton ? strings.LinkURL : strings.URL,
            })
          ];
        const showUrl = this.properties.variant === TileVariant.TextUnderCard ?
          []
          : urlField;

        return [
          ...previous,
          {
            groupName: `${strings.TileGroupName} #${index + 1}`,
            groupFields: [
              ...imageUrl,
              ...title,
              ...text,
              ...linkText,
              ...showUrl,
              ...externalLinkCheckbox,
              ...targetCheckbox,
              PropertyPaneHorizontalRule(),
            ],
          },
        ]
      }, []);
  }

  /**
   * Generates a list of variants for the link
   * @returns IPropertyPaneChoiceGroupOption[]
   */
  protected generateVariantSelect(): IPropertyPaneChoiceGroupOption[] {
    const linkVariants = Object.values(TileVariant);

    return linkVariants.map((tileVariant, index) => ({
      text: (tileVariantNames as any)[tileVariant],
      key: tileVariant,
      checked: this.properties.variant
        ? this.properties.variant === tileVariant
        : !index,
      imageSize: {
        width: 58,
        height: 36,
      },
      imageSrc: tileVariantImages[tileVariant],
      selectedImageSrc: tileVariantImages[tileVariant],
    }));
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const is3ColumnsName = this._buildTilePropName(0, TileFieldVariant.IsThreeColumns);
    const is3ColumnsField = this.properties.variant === TileVariant.ArrowedText
      ? [
        PropertyPaneToggle(is3ColumnsName, {
          label: strings.ThreeColumnsLabel,
          onText: strings.Yes,
          offText: strings.No,
        }),
      ] : [];

    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('numberOfTiles', {
                  label: strings.NumberOfTiles,
                }),
                PropertyPaneChoiceGroup('variant', {
                  label: strings.Variant,
                  options: this.generateVariantSelect(),
                }),
                ...is3ColumnsField,
                PropertyPaneHorizontalRule(),
              ]
            },
            ...this.generateTileConfigList(+this.properties.numberOfTiles || 0),
          ]
        }
      ]
    };
  }
}