import { user } from '../context/userStore';
import { get } from 'svelte/store';
import { navigate } from 'svelte-routing';

// Check if there is a user logged in
export function userLoggedIn() {
    const currentUser = get(user);
  return currentUser !== null;
}

// Redirect if not logged in
export function requireAuth(route) {
    const isLoggedIn = userLoggedIn();
    if (!isLoggedIn) {
        navigate('/login', { replace: true });
    } else {
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