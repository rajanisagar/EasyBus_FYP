import mongoose  from "mongoose";

description:"Daewoo ."
const busSchema = new mongoose.Schema({
    operator:{
        type: String,
        require: true,
        unique: true
    },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    bus_type:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    seats_remaining:{
        type: Number,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    rating:{
        type: Number,
        require: true,
    },
    numReviews:{
        type: Number,
        require: true,
    },
    from:{
        type: String,
        require: true,
       
    },
    to:{
        type: String,
        require: true,
       
    },
    departureDate:{
        type: String,
        require: true,
      
    },
    seats: [
        {
            id: String,
            isAvailable: Boolean,
        }
    ]
}, {
    timestamps: true
})

const Bus = mongoose.model("Bus",busSchema);
export default Bus;