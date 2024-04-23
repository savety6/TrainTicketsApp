import { user } from '../context/userStore';
import { get } from 'svelte/store';
import { navigate } from 'svelte-routing';
import { isLocalStorageForTokenValid, parseJwt } from '.';
import { SvelteComponent } from 'svelte';
import { User } from '../Types';

// Check if there is a user logged in
export function userLoggedIn() {
    const userStore = get(user);
    if (userStore) {
        return true;
    }
    return isLocalStorageForTokenValid();
}

// Redirect if not logged in
export function requireAuth(route: SvelteComponent) {
    const isLoggedIn = userLoggedIn();
    if (!isLoggedIn) {
        navigate('/login', { replace: true });
    } else {
        if(isLocalStorageForTokenValid()){
            const token = localStorage.getItem('TrainTicketsApp-jwt');
            if (!token) {
                navigate('/login', { replace: true });
            }
            const decoded = token ? parseJwt(token) : null;
            if (decoded !== null) {
                user.set(decoded as any);
            }
        }
        return route;
    }
}

// Redirect if logged in (for routes like login or register)
export function guestOnly(route: SvelteComponent) {
    const isLoggedIn = userLoggedIn();
    if (isLoggedIn) {
        navigate('/', { replace: true });
    } else {
        return route;
    }
}