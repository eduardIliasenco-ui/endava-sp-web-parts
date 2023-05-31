import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HeroWebPartStrings';
import Hero from './components/Hero';

export interface IHeroWebPartProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default class HeroWebPart extends BaseClientSideWebPart<IHeroWebPartProps> {
  public render(): void {
    const { imageSrc, title, description } = this.properties;

    ReactDom.render(
      (
        <Hero
          title={title}
          imageSrc={imageSrc}
          description={description}
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
              ]
            }
          ]
        }
      ]
    };
  }
}
