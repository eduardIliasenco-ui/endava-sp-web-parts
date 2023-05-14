import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ELinkBlockWebPartStrings';
import LinkGrid from './components/LinkGrid';
import Link from './components/Link';
import { LinkVariants, Target } from './components/Link/Link.constants';
import API from '../../api/api';
import { ISitePage } from '../eTileBlock/ETileBlockWebPart.types';
import { LinkFieldVariant } from './ELinkBlockWebPart.constants';
import { IELinkBlockWebPartProps } from './ELinkBlockWebPart.types';

export default class ELinkBlockWebPart extends BaseClientSideWebPart<IELinkBlockWebPartProps> {
  /**
   * List of site pages
   */
  private _sitePages: ISitePage[] = [];

  public render(): void {
    const { numberOfLinks, ...linkConfig } = this.properties;
    const links = (new Array(+numberOfLinks || 1).fill(0))
      .map((_: unknown, index: number) => {
        const text = this._buildLinkPropName(index);
        const target = this._buildLinkPropName(index, LinkFieldVariant.LinkTarget);
        const url = this._buildLinkPropName(index, LinkFieldVariant.LinkUrl);

        return (
          <Link
            variant={(this.properties.variant as LinkVariants)}
            url={linkConfig[url]}
            key={`${index}-link`}
            target={linkConfig[target] as Target}
          >
            {linkConfig[text]}
          </Link>
        );
      });
    const element = (
      <LinkGrid variant={this.properties.variant}>
        {links}
      </LinkGrid>
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Retrieves sipe pages to render internal site URL options
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    this._sitePages = await API.getSitePages(this.context);
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
    return this._sitePages.map(({ AbsoluteUrl, Title }, index: number) => ({
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

  /**
   * Generates a set of configuration fields for the config pane
   * @param numberOfLinks 
   * @returns IPropertyPaneField<unknown>[]
   */
  protected generateLinkConfigList(numberOfLinks: number): IPropertyPaneField<unknown>[] {
    return (new Array(+numberOfLinks).fill(1))
      .reduce((previous, _, index) => {
        const internalLinkFieldName = this._buildLinkPropName(index, LinkFieldVariant.InternalLink);
        const linkUrlName = this._buildLinkPropName(index, LinkFieldVariant.LinkUrl);
        const target = this._buildLinkPropName(index, LinkFieldVariant.LinkTarget);
        const isInternalLink = this.properties[internalLinkFieldName];
        const linkUrlLabel = `${strings.URL} ${index + 1}`;

        return [
          ...previous,
          PropertyPaneHorizontalRule(),
          PropertyPaneTextField(this._buildLinkPropName(index), {
            label: `${strings.Text} ${index + 1}`,
          }),
          PropertyPaneCheckbox(
            internalLinkFieldName,
            {
              text: strings.InternalSiteLink,
              checked: false,
            }
          ),
          PropertyPaneDropdown(target, {
            label: strings.Target,
            selectedKey: Target.Blank,
            options: this.buildLinkTargetOptions(),
          }),
          isInternalLink ? PropertyPaneDropdown(linkUrlName, {
            label: linkUrlLabel,
            selectedKey: this._sitePages[0]?.AbsoluteUrl,
            options: this.buildLinkUrlOptions(),
          }) : PropertyPaneTextField(linkUrlName, {
            label: linkUrlLabel,
          }),
        ]
      }, []);
  }

  /**
   * Generates select options for the variants
   * @returns 
   */
  protected generateVariantSelect(): IPropertyPaneDropdownOption[] {
    const linkVariants = Object.values(LinkVariants);

    return linkVariants.map((linkVariant, index) => ({
      text: linkVariant,
      key: linkVariant,
      checked: !index,
    }));
  }

  /**
   * Generates configuration pane fields
   * @returns IPropertyPaneConfiguration
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.LinkGroupName,
              groupFields: [
                PropertyPaneTextField('numberOfLinks', {
                  label: strings.NumberOfLinks,
                }),
                PropertyPaneChoiceGroup('variant', {
                  label: strings.Variant,
                  options: this.generateVariantSelect(),
                }),
                ...this.generateLinkConfigList(+this.properties.numberOfLinks || 1),
              ]
            }
          ]
        }
      ]
    };
  }
}
