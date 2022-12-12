var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require ('bcrypt')
var carbSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    weight:{
        type: String,
        require: true
    },
    fats:{
        type: String,
        require: true
    },
    protein:{
        type: String,
        require: true
    },
    calories:{
        type: String,
        require: true
    }
})




module.exports = mongoose.model('carb',carbSchema)