import mongoose from "mongoose";

const SchedulesSchema = new mongoose.Schema({
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'routes',
        required: true
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations',
        required: true
    },
    destinationStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations',
        required: true
    },
    arrivalTime: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    departureTime: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },

}, { timestamps: true });

const Schedules = mongoose.model('schedules', SchedulesSchema);

export default Schedules;