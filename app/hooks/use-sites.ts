import { API_ENDPOINTS } from '@/lib/constants/apiEndpoints';
import { fetchWithAuth, swrFetcherWithAuth } from '@/lib/services/api/fetchService';
import { siteService } from '@/lib/services/api/sitesService';
import { SiteData, SiteVoteType } from '@/lib/types/sitesData';
import useSWR from 'swr';
import useSWRMutation from "swr/mutation";

export function useSites() {
    const { data, error, isLoading, mutate } = useSWR<SiteData[]>(
        API_ENDPOINTS.sites.getAllSites,
        fetchWithAuth
    );

    return {
        sites: data ?? [],
        isLoading,
        isError: error,
        refreshSites: mutate,

    };
}

async function createSiteRequest(
    url: string,
    { arg }: { arg: Partial<SiteData> }
) {
    return await siteService.createSite(arg);
}

export function useCreateSite() {
    const { trigger, isMutating, error } = useSWRMutation(
        API_ENDPOINTS.sites.createSite,
        createSiteRequest
    );

    return {
        createSite: trigger,
        isCreating: isMutating,
        errorCreating: error,
    };
}

export function useSiteById(siteId: number) {
    const key = siteId ? API_ENDPOINTS.sites.getSiteById(siteId) : null;
    const { data, error, isLoading, mutate } = useSWR(
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
        isError: error
    };
}


async function submitVoteRequest(url: string, { arg }: { arg: Partial<SiteVoteType> }) {
    const { siteId, ...voteData } = arg
    return await siteService.submitSiteVerificationVote(siteId!, voteData)
}
export function useSubmitVote(siteId: number) {
    const key = API_ENDPOINTS.sites.submitVote(siteId)
    const { trigger, isMutating, error } = useSWRMutation(key, submitVoteRequest)
    return {
        submitVote: trigger,
        isSubmitting: isMutating,
        submitError: error,
    }
}


// get votes by site
export function useVotesBySiteId(siteId: number | null) {
    const key = siteId ? API_ENDPOINTS.sites.getVotesBySiteId(siteId) : null;
    const { data, error, isLoading } = useSWR(
        key,
        fetchWithAuth,
        {
        dedupingInterval: 10_000,
        shouldRetryOnError: false,
    }
    );

    return {
        votes: data ?? [],
        isVotesLoading: isLoading,
        isVotesError: error,

    };
}
