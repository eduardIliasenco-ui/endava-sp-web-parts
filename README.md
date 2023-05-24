# sp-component-solution

#### Development
- 'nvm install' 16.13.0
- 'nvm alias default' 16.13.0
- 'npm install yarn@1.22.19' - if not installed
- 'yarn prepare:cert' - Creates dev certificate. Or (npm run prepare:dev)
- 'yarn prepare:dev' - Creates dev certificate, installs you and gulp
- 'yarn' - to install all the dependencies
- 'yarn global add yo' or ('npm run prepare:dev')
- 'yarn add:webpart' - Creates a Web Part
- change "config/serve.json" to have - "initialPage": "https://endava.sharepoint.com/_layouts/15/workbench.aspx"
- 'npm start'

#### File naming
- Components - "PascalCase"
- Other files like utils, hekpers and so on - "kebab-case"
- "*.constants.ts" - component related constants
- "*.types.d.ts" - component related types and interfaces
- "*.module.scss" - component related styles

#### Icons
'Stored in src/icons'
Icons are generated with https://icomoon.io/app/#/select
- Press "Import Icons"
- Select icons from your computer
- Press "Generate Font"
- Press "Preferences"
- - Select "Generate preprocessor variables for: SASS", use a class ".icon", font name "Endava-icons", class prefix "icon-"
- Press download
- Store "variables.scss", "style.scss" as "style.module.scss" and "fonts" folder in src/icons

Note that icons.constants.ts contains all references to the icon class names. Use these constants to use icon styles or to add new.
"common-icons.module.scss" contains all the custom styles related to the icons. Use this file to customize icons if it's needed.

#### Common components
'src/components' folder contains all the shared components between web parts.
- IconSelect - is a block/wrapper that opens ModalIconSelect on click
- ModalIconSelect - a modal window that contains a list of the icons (except arrows - for more details ask design team)
- Text - text component that wraps text in "p" or in "span" (can be extended)

#### API class
'src/utils/API'
API class consists of methods to retrieve data from the SH API or 3rd-parties.
- GET getSitePages - this method retrieves site pages and caches them in a local storage. If pages were previously retrieved during the session, it'll pick them up from the cache.

#### LocalStorage class
'src/utils/LocalStorage'
Implements localStorage functionality.

### Web Parts
#### eLinkBlock
[Hish-level documentation](https://confluence.endava.com/display/RP/Link+Block+configuration)
'src/webparts/eLinkBlock'
Is a component that imoplements Link Block functionality.

'src/webparts/eLinkBlock/components'
- Link - A single link component
- LinkGrid - Grid wrapper for a link

'src/webparts/eLinkBlock/assets'
Link related images

'src/webparts/eLinkBlock/loc'
Localisation related texts


## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
