import { API_ENDPOINTS } from "@/lib/constants/apiEndpoints";
import { SiteCategory, SiteData } from "@/lib/types/sitesData";
import { fetchWithAuth } from "./fetchService";


export const siteService = {

    async getAllSiteFetch(): Promise<SiteData[]>{
        const url = API_ENDPOINTS.sites.getAllSites;
        return fetchWithAuth<SiteData[]>(url);
    }
}
