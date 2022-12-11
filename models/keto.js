var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require ('bcrypt')
var ketoSchema = new Schema({
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




module.exports = mongoose.model('keto',ketoSchema)