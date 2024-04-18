export function parseJwt(token: string): object | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;  // Return null or handle error appropriately if the token is invalid
    }
}

export function isLocalStorageForTokenValid(): boolean {
    const token = localStorage.getItem('TrainTicketsApp-jwt');
    if (token) {
        const decoded = parseJwt(token);
        if (decoded) {
            return true;
        }
    }
    return false;
}

