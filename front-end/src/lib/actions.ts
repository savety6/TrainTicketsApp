import type { Ticket, UserActionIncomingData, UserActionResponse } from '../Types';

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

export async function fetchCities() {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        const response = await fetch("http://localhost:3001/Schedule/stations", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();

        if (response.ok) {
            return { status: 'success', message: 'Cities fetched successfully', cities: data };
        } else {
            console.error('Fetching cities failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function fetchRoutes(city: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }
        const response = await fetch(`http://localhost:3001/Schedule/routes/${city}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Routes fetched successfully', routes: data };
        } else {
            console.error('Fetching routes failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function fetchScheduleByRouteId(routeId: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }
        const response = await fetch(`http://localhost:3001/Schedule/schedules/${routeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Schedules fetched successfully', schedules: data };
        } else {
            console.error('Fetching schedules failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function fetchDiscountCardsWaitingList() {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Schedule/discountCardWaitingList`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Discount cards fetched successfully', discountCards: data };
        } else {
            console.error('Fetching discount cards failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function applyForDiscountCard(userId: string, type: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Schedule/discountCardWaitingList/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ requestedDiscountCard: type })
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Discount card applied successfully' };
        } else {
            console.error('Applying for discount card failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function approvedDiscountCard(userId: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Schedule/discountCardWaitingList/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Discount card approved successfully' };
        } else {
            console.error('Approving discount card failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function rejectDiscountCard(userId: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Schedule/discountCardWaitingList/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Discount card rejected successfully' };
        } else {
            console.error('Rejecting discount card failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function buyTicket(ticketData: Ticket) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const { _id, ...strippedTicketData } = ticketData;
        const body = JSON.stringify(strippedTicketData);
        const response = await fetch(`http://localhost:3001/Tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Ticket purchased successfully' };
        } else {
            console.error('Purchasing ticket failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function fetchTickets(userId: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Tickets/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { status: 'success', message: 'Tickets fetched successfully', tickets: data };
        } else {
            console.error('Fetching tickets failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function cancelTicket(ticketId: string) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const response = await fetch(`http://localhost:3001/Tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            return { status: 'success', message: 'Ticket deleted successfully' };
        } else {
            const data = await response.json();
            console.error('Deleting ticket failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}

export async function updateTicket(ticketData: Ticket) {
    try {
        const token = localStorage.getItem('TrainTicketApp_jwt');
        if (!token) return { status: 'error', message: 'User not authenticated' }

        const { _id, ...strippedTicketData } = ticketData;
        const body = JSON.stringify(strippedTicketData);
        const response = await fetch(`http://localhost:3001/Tickets/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body
        });
        
        if (response.ok) {
            return { status: 'success', message: 'Ticket updated successfully' };
        } else {
            const data = await response.json();
            console.error('Updating ticket failed:', data.error);
            return { status: 'error', message: data.error };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { status: 'error', message: error.message };
    }
}
