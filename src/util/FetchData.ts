import { connectToDatabase } from './';
import User from '@/Models/User'; 
import Ticket from '@/Models/Ticket';


export const getUsers = async () => {
    try {
        await connectToDatabase();
        return User.find();
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw new Error("Error fetching users.");
    }
}

export const getUserById = async (id: string) => {
    try {
        await connectToDatabase();
        return User.findById(id);
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw new Error("Error fetching user.");
    }
}

export const getTickets = async () => {
    try {
        await connectToDatabase();
        return Ticket.find();
    } catch (error) {
        console.error("Error fetching tickets: ", error);
        throw new Error("Error fetching tickets.");
    }
}

export const getTicketById = async (id: string) => {
    try {
        await connectToDatabase();
        return Ticket.findById(id);
    } catch (error) {
        console.error("Error fetching ticket: ", error);
        throw new Error("Error fetching ticket.");
    }
}
