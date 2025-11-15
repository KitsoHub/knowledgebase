import { API_ENDPOINTS } from '@/lib/constants/apiEndpoints';
import { fetchWithAuth } from '@/lib/services/api/fetchService';
import { siteService } from '@/lib/services/api/sitesService';
import { SiteData } from '@/lib/types/sitesData';
import useSWR from 'swr';
import useSWRMutation from "swr/mutation";

export function useSites(){
    const {data, error, isLoading, mutate} = useSWR<SiteData[]>(
        API_ENDPOINTS.sites.getAllSites,
        fetchWithAuth
    );

    return {
        sites:data ?? [],
        isLoading,
        isError: error,
        refreshSites: mutate,

    };
}

async function createSiteRequest(
    url: string,
    {arg}: {arg: Partial<SiteData>}
){
    return await siteService.createSite(arg);
}

export function useCreateSite(){
    const {trigger, isMutating, error} = useSWRMutation(
        API_ENDPOINTS.sites.createSite,
        createSiteRequest
    );

    return {
        createSite: trigger,
        isCreating: isMutating,
        errorCreating:error,
    };
}

export function useSiteById(siteId: number){
    const key = siteId ? API_ENDPOINTS.sites.getSiteById(siteId) : null;
    const {data ,error, isLoading, mutate} = useSWR(
        key,
        fetchWithAuth,
        {
            dedupingInterval: 10_000,
            shouldRetryOnError: false,
        }
    );
    return {
        site: data,
        isLoading,
        isError: error,
        refreshSite: mutate,
    };
}
