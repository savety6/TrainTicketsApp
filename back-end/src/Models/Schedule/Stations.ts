import mongoose from "mongoose";

const StationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:255,
        unique:true
    },
}, {timestamps:true});

const Stations = mongoose.model('stations', StationSchema);

export default Stations;