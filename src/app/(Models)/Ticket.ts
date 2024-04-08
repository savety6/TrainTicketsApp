import mongoose, { Schema, Document } from 'mongoose';

interface ITicket extends Document {
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
    active: boolean;
}

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    console.error("MONGODB_URI is not defined.");
}

mongoose.Promise = global.Promise;

const ticketSchema = new Schema<ITicket>(
    {
        title: String,
        description: String,
        category: String,
        priority: Number,
        progress: Number,
        status: String,
        active: Boolean,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);