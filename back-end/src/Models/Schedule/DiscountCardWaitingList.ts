import mongoose from "mongoose";

const DiscountCardWaitingListSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    requestedDiscountCard:{
        type:String,
        enum:['elderly', 'family'],
    }
}, {timestamps:true});

const DiscountCardWaitingList = mongoose.model('discountCardWaitingListSchema', DiscountCardWaitingListSchema);

export default DiscountCardWaitingList;