var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var dietSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    num:{
        type: String,
        require: true
    },
    keto:{
        type: Boolean,
        require: true
    },
    paleo:{
        type: Boolean,
        require: true
    },
    vegetarian:{
        type: Boolean,
        require: true
    },
    raw:{
        type: Boolean,
        require: true
    },
    carb:{
        type: Boolean,
        require: true
    },
    sugar:{
        type: Boolean,
        require: true
    }
})




module.exports = mongoose.model('diet',dietSchema)