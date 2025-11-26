import { SiteEndpointKey } from './../../constants/apiEndpoints';
import { API_ENDPOINTS } from "@/lib/constants/apiEndpoints";
import { SiteCategory, SiteData, SiteVoteType } from "@/lib/types/sitesData";
import { fetchWithAuth, fetchWithAuthMedia } from "./fetchService";


export const siteService = {

    async getAllSiteFetch(): Promise<SiteData[]> {
        const url = API_ENDPOINTS.sites.getAllSites;
        return fetchWithAuth<SiteData[]>(url);
    },

    async createSite(siteData: Partial<SiteData>): Promise<SiteData> {

        const formData = new FormData();

        Object.entries(siteData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'metadata' && typeof value === 'object') {
                    Object.entries(value).forEach(([metaKey, metaValue]) => {
                        formData.append(`metadata.${metaKey}`, String(metaValue));
                    });
                } else if (key !== 'uploaded_images') {
                    formData.append(key, String(value));
                }
            }
        });
          if (siteData.uploaded_images) {
            siteData.uploaded_images.forEach((file: File) => {
            formData.append('uploaded_images', file, file.name);
            });
        }

        // const formDataFiles = formData.getAll('uploaded_images');
        // console.error(`🚀 Files Found ${formDataFiles.length} files`);


        // console.error(" 🚀Files: ", formDataFiles)

        const url = API_ENDPOINTS.sites.createSite;
        return fetchWithAuth<SiteData>(url, {
            method: 'POST',
            body: formData,
        });
    },

    async submitSiteVerificationVote(siteId: number, voteData: Partial<SiteVoteType>): Promise<SiteVoteType> {
        const url = API_ENDPOINTS.sites.submitVote(siteId)
        return fetchWithAuth<SiteVoteType>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voteData)
        })
    }

    // async getSiteById(siteId: string): Promise<SiteData>{
    //     const url = API_ENDPOINTS.sites.getSiteById(siteId);
    //     return fetchWithAuth<SiteData>(url);
    // }

}
