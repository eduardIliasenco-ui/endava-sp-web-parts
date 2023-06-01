import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HeroWebPartStrings';
import Hero from './components/Hero';
import { IHeroWebPartProps } from './HeroWebPart.types';

export default class HeroWebPart extends BaseClientSideWebPart<IHeroWebPartProps> {
  public render(): void {
    const { imageSrc, title, description, imagePositionX, imagePositionY } = this.properties;

    ReactDom.render(
      (
        <Hero
          title={title}
          imageSrc={imageSrc}
          description={description}
          imagePositionX={imagePositionX}
          imagePositionY={imagePositionY}
        />
      )
      ,
      this.domElement
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('imageSrc', {
                  label: strings.ImageURLFieldLabel,
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneTextField('imagePositionX', {
                  label: strings.ImagePositionX,
                  maxLength: 3,
                }),
                PropertyPaneTextField('imagePositionY', {
                  label: strings.ImagePositionY,
                  maxLength: 3,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
