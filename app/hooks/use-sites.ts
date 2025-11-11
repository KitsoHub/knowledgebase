import { API_ENDPOINTS } from '@/lib/constants/apiEndpoints';
import { fetchWithAuth } from '@/lib/services/api/fetchService';
import { SiteData } from '@/lib/types/sitesData';
import useSWR from 'swr';

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
