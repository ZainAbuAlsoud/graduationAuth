var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var normalSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    video:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('normal',normalSchema)