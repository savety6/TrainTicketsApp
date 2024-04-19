import mongoose from "mongoose";

const TrainsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:255,
        unique:true
    },
    type:{
        type:String,
        required:true,
        enum: ['electric', 'diesel'],
        min:3,
        max:255
    },
    capacity:{
        type:Number,
        required:true,
        min:0
    },
}, {timestamps:true});

const Trains = mongoose.model('trains', TrainsSchema);

export default Trains;