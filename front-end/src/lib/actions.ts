import type { UserActionIncomingData, UserActionResponse } from '../Types';

export async function registerUser(credentials: UserActionIncomingData): Promise<UserActionResponse> {
    try {
        const response = await fetch("http://localhost:3001/Auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('TrainTicketApp_jwt', data.token);
            return { status: 'success', message: 'Registration successful', token: data.token };
        } else {
            console.error('Registration failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function loginUser(credentials: UserActionIncomingData): Promise<UserActionResponse> {
    try {
        const response = await fetch("http://localhost:3001/Auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('TrainTicketApp_jwt', data.token);
            return { status: 'success', message: 'Registration successful', token: data.token };
        } else {
            console.error('Registration failed:', data.error);
            return { status: 'error', message: data.error };
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}
    