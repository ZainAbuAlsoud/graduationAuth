var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require ('bcrypt')
var bmiSchema = new Schema({
    email:{
        type: String,
        require: true
    },
    weight:{
        type: String,
        require: true
    },
    height:{
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
})



module.exports = mongoose.model('bmi',bmiSchema)