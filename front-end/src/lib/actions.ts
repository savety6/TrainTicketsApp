import type { UserActionIncomingData, UserActionResponse } from '../Types';
export async function registerUser(credentials: UserActionIncomingData): Promise<UserActionResponse> {
    try {
        console.log('registerUser:', credentials);
        
        const response = await fetch("http://localhost:3001/Auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Registration successful:', data);
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