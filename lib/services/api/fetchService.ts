
import { tokenService } from "../auth/token.service";


export const DTOKEN = process.env.NEXT_PUBLIC_DJANGO_BASE_ADMIN_TOKEN;

export async function fetchWithAuth<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {


    let token = tokenService.getAccessToken();
    if (!token && DTOKEN) {
        console.info("ℹ️ Using default admin token from env.");
        tokenService.setToken(DTOKEN);
        token = DTOKEN;
    }

    if (!token) {
        console.warn("⚠️ No token available for fetchWithAuth");
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(init?.headers as Record<string, string> | undefined),
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    const res = await fetch(input, { ...init, headers });
    if (!res.ok) {
        const text = await res.text().catch(() => null);
        const error = new Error(`Fetch error: ${res.status} ${res.statusText} - ${text || 'No response body'}`);
        (error as any).status = res.status;
        throw error;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {

        return res.json();
    }


    return (await res.text()) as unknown as T;
}
