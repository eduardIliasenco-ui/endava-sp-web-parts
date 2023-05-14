import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneChoiceGroupOption,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { update } from '@microsoft/sp-lodash-subset';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ETileBlockWebPartStrings';
import TileGrid from './components/TileGrid';
import { CARDS_WITH_TEXT, CARDS_WITH_TITLE, TileFieldVariant, TileVariant } from './components/Tile/Tile.constants';
import API from '../../api/api';
import Tile from './components/Tile';
import { IconVariant } from '../../icons/Icon.constants';
import { Target } from '../eLinkBlock/components/Link/Link.constants';
import { IETileBlockWebPartProps, ISitePage } from './ETileBlockWebPart.types';

export default class ETileBlockWebPart extends BaseClientSideWebPart<IETileBlockWebPartProps> {
  _sitePages: ISitePage[] = [];

  public render(): void {
    const { variant } = this.properties;
    const tiles = (new Array(+this.properties.numberOfTiles || 0).fill(0))
      .map((_, index) => {
        const text = this.properties[this._buildTilePropName(index, TileFieldVariant.TileText)];
        const linkText = this.properties[this._buildTilePropName(index, TileFieldVariant.TileLinkText)];
        const imageUrl = this.properties[this._buildTilePropName(index, TileFieldVariant.ImageUrl)];
        const tileUrl = this.properties[this._buildTilePropName(index, TileFieldVariant.TileUrl)];
        const title = this.properties[this._buildTilePropName(index, TileFieldVariant.TileTitle)];
        const target = this.properties[this._buildTilePropName(index, TileFieldVariant.Target)];
        const iconFieldName = this._buildTilePropName(index, TileFieldVariant.TileIcon)

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
            icon={this.properties[iconFieldName]}
            isEdit={this.displayMode === DisplayMode.Edit}
            onIconSelect={(value) => this.updatePropertyValue(iconFieldName, value)}
          />
        )
      })
    const element = <TileGrid variant={variant}>{tiles}</TileGrid>;

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
    this._sitePages = await API.getSitePages(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Builds link option list for PropertyPaneDropdown from this._sitePages data
   */
  protected buildLinkUrlOptions(): IPropertyPaneDropdownOption[] {
    return this._sitePages
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
  protected generateTileConfigList(numberOfTiles: number): IPropertyPaneField<unknown>[] {
    return (new Array(+numberOfTiles).fill(1))
      .reduce((previous, _, index) => {
        const tileText = this._buildTilePropName(index, TileFieldVariant.TileText);
        const tileUrl = this._buildTilePropName(index, TileFieldVariant.TileUrl);
        const tileLinkText = this._buildTilePropName(index, TileFieldVariant.TileLinkText);
        const imageUrlName = this._buildTilePropName(index, TileFieldVariant.ImageUrl);
        const isExternalLink = this._buildTilePropName(index, TileFieldVariant.IsExternalLink);
        const linkTarget = this._buildTilePropName(index, TileFieldVariant.Target);
        const tileTitle = this._buildTilePropName(index, TileFieldVariant.TileTitle);
        const tileUrlLabel = `${strings.URL} ${index + 1}`;
        const isCardWithTitle = CARDS_WITH_TITLE.includes(this.properties.variant);
        const isCardWithText = CARDS_WITH_TEXT.includes(this.properties.variant);
        const isCartWithButton = this.properties.variant === TileVariant.TextAndButtonUnderCard;
        const title = isCardWithTitle
          ? [PropertyPaneTextField(tileTitle, {
            label: `${strings.Title} ${index + 1}`,
          })] : [];
        const linkText = isCartWithButton ? [
          PropertyPaneTextField(tileLinkText, {
            label: `${strings.LinkText} ${index + 1}`,
          })
        ] : [];
        const imageUrl = this.properties.variant === TileVariant.TextAndButtonUnderCard ? [
          PropertyPaneTextField(imageUrlName, {
            label: `${strings.ImageUrl} ${index + 1}`,
          })] : [];
        const text = isCardWithText ? [PropertyPaneTextField(tileText, {
          label: `${strings.Text} ${index + 1}`,
        })] : [];

        return [
          ...previous,
          PropertyPaneHorizontalRule(),
          ...title,
          ...text,
          PropertyPaneCheckbox(isExternalLink, {
            text: strings.ExternalLink,
            checked: false,
          }),
          this.properties[isExternalLink] ? PropertyPaneTextField(tileUrl, {
            label: tileUrlLabel,
          }) : PropertyPaneDropdown(tileUrl, {
            label: tileUrlLabel,
            selectedKey: this._sitePages[0]?.AbsoluteUrl,
            options: this.buildLinkUrlOptions(),
          }),
          PropertyPaneDropdown(linkTarget, {
            label: strings.Target,
            selectedKey: Target.Blank,
            options: this.buildLinkTargetOptions(),
          }),
          ...imageUrl,
          ...linkText,
        ]
      }, []);
  }

  /**
   * Generates a list of variants for the link
   * @returns IPropertyPaneChoiceGroupOption[]
   */
  protected generateVariantSelect(): IPropertyPaneChoiceGroupOption[] {
    const linkVariants = Object.values(TileVariant);

    return linkVariants.map((linkVariant, index) => ({
      text: linkVariant,
      key: linkVariant,
      checked: !index,
    }));
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.TileGroupName,
              groupFields: [
                PropertyPaneTextField('numberOfTiles', {
                  label: strings.NumberOfTiles,
                }),
                PropertyPaneChoiceGroup('variant', {
                  label: strings.Variant,
                  options: this.generateVariantSelect(),
                }),
                ...this.generateTileConfigList(+this.properties.numberOfTiles || 1),
              ]
            }
          ]
        }
      ]
    };
  }
}
