const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({

    bookId:{
        type: ObjectId,
        required:true,
        ref:"Books"
    },
    reviewedBy: {
    type:String,
    required: true,
    default: 'Guest',
    //  value:{
    //     reviewer's name,
    //  },
},
reviewedAt:{
    type: Date,
    required: true,
},
rating:{
    type: Number,
    required: true,
    min: 1,
    max: 5
}, 
review:{
    type:String,
},
isDeleted: {
    type:Boolean, 
    default: false
},
},{timestamps:true})
module.exports = mongoose.model("Review", reviewSchema)