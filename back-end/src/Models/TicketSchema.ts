import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress'],
        default: 'pending'
    },
    price: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Tickets = mongoose.model('tickets', TicketSchema);

export default Tickets;