import mongoose from 'mongoose';

type DbConnection = {
    isConnected?: number;
};

const connection: DbConnection = {};

export const connectToDatabase = async () => {
    if (process.env.MONGODB_URI) {
        try {
            if (connection.isConnected) {
                console.log("Using existing database connection.");
                return;
            }
            const db = await mongoose.connect(process.env.MONGODB_URI);
            connection.isConnected = db.connections[0].readyState;
        } catch (error) {
            console.error("Error connecting to database: ", error);
            throw new Error("Error connecting to database.");
        }
    } else {
        console.error("MONGODB_URI is not defined.");
        throw new Error("MONGODB_URI is not defined.");
    }
    mongoose.Promise = global.Promise;
};