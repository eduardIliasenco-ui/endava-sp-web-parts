import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Endpoints } from "./endpoint.constants";
import {SPHttpClient} from "@microsoft/sp-http";
import { ISitePage } from "../../webparts/eTileBlock/ETileBlockWebPart.types";
import LocalStorage from "../LocalStorage";

/**
 * A set of methods to call SP API
 */
export default class API {
    protected static sitePagesStorageName = 'sitePages';
    protected static isPageCallInitiated = false;

    protected static commonHeaders = {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose;charset=utf-8',
    };
    
    /**
     * GET SH Site pages
     * @param context - WebPartContext
     * @returns a list of pages
     */
    public static getSitePages(context: WebPartContext): ISitePage[] {
        const siteBaseURL = context.pageContext.site.absoluteUrl;
        const storedPages = LocalStorage.getValue<ISitePage[]>(this.sitePagesStorageName);

        if (this.isPageCallInitiated) return storedPages || [];

        const retrievePages = async (): Promise<ISitePage[]> => {
            const data = await context
                .httpClient
                .get(
                    `${siteBaseURL}${Endpoints.SitePagesList}`, SPHttpClient.configurations.v1,
                    { headers: this.commonHeaders }
                );
            const dataObject = await data.json();
            const result = dataObject?.d.results;

            LocalStorage.setValue(this.sitePagesStorageName, result);

            return result;
        };

        this.isPageCallInitiated = true;
        retrievePages()
            .then((_) => {
                context.propertyPane?.refresh?.();
            })
            .catch(console.error);
        
        return storedPages;
    }
}