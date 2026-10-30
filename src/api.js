const STORAGE_KEY = 'user';

/** The login response, which now carries the bearer token alongside the profile. */
export function storedUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        // Corrupt or blocked storage: treat it as logged out rather than throwing
        // from every call site.
        return null;
    }
}

/**
 * fetch, with the bearer token attached.
 *
 * /api/** used to be open, so the app sent nothing and any userId in a path was
 * taken at face value. It now requires a token and checks that the id in the
 * path matches the token's subject, so every call except login has to go
 * through here.
 *
 * A 401 means the token is missing or expired -- tokens last 24 hours, so this
 * happens to a tab left open overnight. Clearing the stored user and reloading
 * drops the app back to the login screen instead of leaving it half-broken with
 * every panel failing. Login itself uses plain fetch, so this cannot loop.
 *
 * A 403 is deliberately not handled here: it means the token is good but the
 * request was for somebody else's data, which is a bug to see, not to recover
 * from.
 */
export async function apiFetch(path, options = {}) {
    const token = storedUser()?.token;
    const headers = { ...(options.headers || {}) };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(path, { ...options, headers });

    if (response.status === 401) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }

    return response;
}
