import { user } from '../context/userStore';
import { get } from 'svelte/store';
import { navigate } from 'svelte-routing';
import { isLocalStorageForTokenValid, parseJwt } from '.';

// Check if there is a user logged in
export function userLoggedIn() {
    const userStore = get(user);
    if (userStore) {
        return true;
    }
    return isLocalStorageForTokenValid();
}

// Redirect if not logged in
export function requireAuth(route) {
    const isLoggedIn = userLoggedIn();
    if (!isLoggedIn) {
        navigate('/login', { replace: true });
    } else {
        if(isLocalStorageForTokenValid()){
            const token = localStorage.getItem('TrainTicketsApp-jwt');
            const decoded = parseJwt(token);
            if (decoded) {
                user.set(decoded);
            }
        }
        return route;
    }
}

// Redirect if logged in (for routes like login or register)
export function guestOnly(route) {
    const isLoggedIn = userLoggedIn();
    if (isLoggedIn) {
        navigate('/', { replace: true });
    } else {
        return route;
    }
}