import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Endpoints } from "./endpoint.constants";
import {SPHttpClient} from "@microsoft/sp-http";
import { ISitePage } from "../webparts/eTileBlock/ETileBlockWebPart.types";

export default class API {
    protected static commonHeaders = {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose;charset=utf-8',
    };
    
    public static async getSitePages(context: WebPartContext): Promise<ISitePage[]> {
        const siteBaseURL = context.pageContext.site.absoluteUrl;

        try {
            const data = await context.httpClient.get(`${siteBaseURL}${Endpoints.SitePagesList}`, SPHttpClient.configurations.v1, { headers: this.commonHeaders });
            const result = await data.json();

            return result?.d.results;
        } catch (error) {
            console.error(error);
         
            return null;
        }
    }
}