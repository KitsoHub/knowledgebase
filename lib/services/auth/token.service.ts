class TokenService {
    private static readonly DJANGO_TOKEN_KEY = 'django_token';

    private isBrowser(): boolean {
        return typeof window !== 'undefined'
    }


    getAccessToken(): string | null {

        if (!this.isBrowser()) {
            return null
        }
        try {

            return localStorage.getItem(TokenService.DJANGO_TOKEN_KEY) || process.env.DJANGO_BASE_ADMIN_TOKEN || null;
        } catch (err) {
            console.error('Failed to read token from localStorage', err);
            return null;
        }
    }

    setToken(token: string): boolean {
        if (!this.isBrowser()) {
            return false
        }
        try {
            localStorage.setItem(TokenService.DJANGO_TOKEN_KEY, token);
            return true;
        } catch (err) {
            // localStorage can fail in some environments — fail silently or log.
            console.error('Failed to set token in localStorage', err);
            return false;
        }
    }

    clearToken(): boolean {
        if (!this.isBrowser()) {
            return false
        }
        try {
            localStorage.removeItem(TokenService.DJANGO_TOKEN_KEY);
            return true;
        } catch (err) {
            console.error('Failed to remove token from localStorage', err);
            return false;
        }
    }

    hasToken(): boolean {
        return !!this.getAccessToken();
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    getAuthHeader(): string | null {
        const token = this.getAccessToken()
        return token ? `Token ${token}` : null
    }
}

export const tokenService = new TokenService();
// export default TokenService;
