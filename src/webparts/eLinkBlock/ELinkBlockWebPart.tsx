import * as React from 'react';
import * as ReactDom from 'react-dom';
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
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ELinkBlockWebPartStrings';
import LinkGrid from './components/LinkGrid';
import Link from './components/Link';
import { LinkVariants, Target } from './components/Link/Link.constants';
import API from '../../utils/API';
import { ISitePage } from '../eTileBlock/ETileBlockWebPart.types';
import { LinkFieldVariant, linkVariantImages } from './ELinkBlockWebPart.constants';
import { IELinkBlockWebPartProps } from './ELinkBlockWebPart.types';

export default class ELinkBlockWebPart extends BaseClientSideWebPart<IELinkBlockWebPartProps> {
  /**
   * List of site pages
   */
  private _sitePages: ISitePage[] = [];

  protected get sitePages(): ISitePage[] {
    if (this._sitePages?.length) return this._sitePages;

    this._sitePages = API.getSitePages(this.context);

    return this._sitePages;
  }

  protected async onInit(): Promise<void> {
    this.properties.variant = this.properties.variant || LinkVariants.Bordered;
  }

  public render(): void {
    const { variant, ...linkConfig } = this.properties;
    const links = (new Array(this.getMaxFieldNumber()).fill(0))
      .map((_: unknown, index: number) => {
        const text = this._buildLinkPropName(index);
        const isWhiteText = this.properties[this._buildLinkPropName(0, LinkFieldVariant.LinkWhiteText)];
        const isCurrentWindow = this.properties[this._buildLinkPropName(index, LinkFieldVariant.LinkTarget)];
        const target = isCurrentWindow ? Target.Self : Target.Blank;
        const url = this._buildLinkPropName(index, LinkFieldVariant.LinkUrl);

        return (
          <Link
            variant={(this.properties.variant as LinkVariants)}
            isWhiteText={!!isWhiteText}
            url={linkConfig[url]}
            key={`${index}-link`}
            target={target}
          >
            {linkConfig[text]}
          </Link>
        );
      });

    let element: React.ReactElement;

    if (variant === LinkVariants.GhostArrowRight) {
      element = links[0];
    } else {
      element = (
        <LinkGrid variant={this.properties.variant}>
          {links}
        </LinkGrid>
      );
    }

    ReactDom.render(element, this.domElement);
  }

  /**
   * Retrieves sipe pages to render internal site URL options
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    this._sitePages = this.sitePages;
  }

  /**
   * Builds a link name based on link index
   * @param index number that represents link index in this.properties
   * @returns 
   */
  protected _buildLinkPropName(index: number, field: LinkFieldVariant = LinkFieldVariant.LinkText): string {
    return `${field}_${index}`;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Generates internal site link options
   * @returns IPropertyPaneDropdownOption[]
   */
  protected buildLinkUrlOptions(): IPropertyPaneDropdownOption[] {
    return this.sitePages.map(({ AbsoluteUrl, Title }, index: number) => ({
      key: AbsoluteUrl,
      text: Title,
      index,
      type: 0,
    }));
  }

  /**
   * Generates target options for the html anchor "target" attribute
   * @returns IPropertyPaneDropdownOption[]
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

  protected getMaxFieldNumber(): number {
    const { numberOfLinks = 0 } = this.properties;
    const numberOfLinksVariant = this.properties.variant === LinkVariants.GhostArrowRight
      ? 1 : numberOfLinks;

    return +numberOfLinksVariant < 99 ? +numberOfLinksVariant : 99;
  }

  /**
   * Generates a set of configuration fields for the config pane
   * @param numberOfLinks 
   * @returns IPropertyPaneField<unknown>[]
   */
  protected generateLinkConfigGroup(numberOfLinks: number): IPropertyPaneGroup[] {
    return (new Array(this.getMaxFieldNumber()).fill(1))
      .reduce((previous, _, index) => {
        const internalLinkFieldName = this._buildLinkPropName(index, LinkFieldVariant.InternalLink);
        const linkUrlName = this._buildLinkPropName(index, LinkFieldVariant.LinkUrl);
        const target = this._buildLinkPropName(index, LinkFieldVariant.LinkTarget);
        const isInternalLink = this.properties[internalLinkFieldName];
        const { sitePages } = this;
        const isSite = !!sitePages?.length;
        const internalLinkCheckbox = isSite
          ? [
            PropertyPaneCheckbox(
              internalLinkFieldName,
              {
                text: strings.InternalSiteLink,
                checked: false,
              }
            )
          ]
          : [];

        return [
          ...previous,
          {
            groupName: `${strings.LinkGroupName} #${index + 1}`,
            groupFields: [
              PropertyPaneTextField(this._buildLinkPropName(index), {
                label: strings.Text,
              }),
              isInternalLink && isSite ? PropertyPaneDropdown(linkUrlName, {
                label: strings.URL,
                selectedKey: sitePages[0]?.AbsoluteUrl,
                options: this.buildLinkUrlOptions(),
              }) : PropertyPaneTextField(linkUrlName, {
                label: strings.URL,
              }),
              ...internalLinkCheckbox,
              PropertyPaneToggle(target, {
                label: strings.Target,
                onText: strings.Yes,
                offText: strings.No,
                checked: false,
              }),
              PropertyPaneHorizontalRule(),
            ]
          },
        ]
      }, []);
  }

  /**
   * Generates select options for the variants
   * @returns 
   */
  protected generateVariantSelect(): IPropertyPaneChoiceGroupOption[] {
    const linkVariants = Object.values(LinkVariants);

    return linkVariants.map((linkVariant: LinkVariants, index: number) => ({
      text: (strings as unknown as any)[linkVariant],
      key: linkVariant,
      checked: this.properties.variant
        ? this.properties.variant === linkVariant
        : !index,
      imageSrc: linkVariantImages[linkVariant],
      selectedImageSrc: linkVariantImages[linkVariant],
      imageSize: {
        width: 68,
        height: 21,
      },
    }));
  }

  /**
   * Generates configuration pane fields
   * @returns IPropertyPaneConfiguration
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const isWhiteText = this._buildLinkPropName(0, LinkFieldVariant.LinkWhiteText);
    const isMultiple = this.properties.variant !== LinkVariants.GhostArrowRight;
    const numberOfLinksField = isMultiple ?
      [
        PropertyPaneTextField('numberOfLinks', {
          label: strings.NumberOfLinks,
        })
      ]
      : [];

    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                ...numberOfLinksField,
                PropertyPaneChoiceGroup('variant', {
                  label: strings.Variant,
                  options: this.generateVariantSelect(),
                }),
                PropertyPaneToggle(isWhiteText, {
                  label: strings.WhiteText,
                  onText: strings.Yes,
                  offText: strings.No,
                  checked: false,
                }),
                PropertyPaneHorizontalRule(),
              ]
            },
            ...this.generateLinkConfigGroup(+this.properties.numberOfLinks || 0),
          ]
        },
      ]
    };
  }
}
