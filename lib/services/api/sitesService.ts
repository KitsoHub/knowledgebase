import { SiteEndpointKey } from './../../constants/apiEndpoints';
import { API_ENDPOINTS } from "@/lib/constants/apiEndpoints";
import { SiteCategory, SiteData } from "@/lib/types/sitesData";
import { fetchWithAuth } from "./fetchService";


export const siteService = {

    async getAllSiteFetch(): Promise<SiteData[]>{
        const url = API_ENDPOINTS.sites.getAllSites;
        return fetchWithAuth<SiteData[]>(url);
    },

    async createSite(siteData: Partial<SiteData>): Promise<SiteData>{
        const url = API_ENDPOINTS.sites.createSite;
        return fetchWithAuth<SiteData>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(siteData),
        });
    },

    // async getSiteById(siteId: string): Promise<SiteData>{
    //     const url = API_ENDPOINTS.sites.getSiteById(siteId);
    //     return fetchWithAuth<SiteData>(url);
    // }

}
