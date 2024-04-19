import mongoose from "mongoose";

const RoutesSchema = new mongoose.Schema({
    trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trains',
        required: true
    },
    originStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations',
        required: true
    },
    destinationStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations',
        required: true
    },
    basePrice:{
        type:mongoose.Schema.Types.Decimal128,
        required:true,
        min:0
    },
    name:{
        type:String,
        required:true,
        min:3,
        max:255,
    },
    
}, {timestamps:true});

const Routes = mongoose.model('routes', RoutesSchema);

export default Routes;