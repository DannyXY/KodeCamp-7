const mongoose = require('mongoose')
const { Schema } = mongoose

const location = new Schema({
    locationName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    website:String,
    phone:{
        type:String,
        required:true,
    },
    contactPerson:{
        type:String,
        required:true
    },
    coordinates:{
        longitude:{
            type:Number,
            required:true
        },
        latitude:{
            type:Number,
            required:true
        }
    }
})

const locationSchema = mongoose.model('location', location )
module.exports = {locationSchema}