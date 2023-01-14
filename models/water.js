var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var waterSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    percent:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('water',waterSchema)