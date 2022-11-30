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

// userSchema.pre('save',function(next){
//     var user = this;
//     if(this.isModified('password') || this.isNew){
//         bcrypt.genSalt(10,function(err,salt){
//             if(err){
//                 return next(err)
//             }
//             bcrypt.hash(user.password,salt,function(err,hash){
//                 if(err){
//                     return next(err)
//                 }
//                 user.password = hash;
//                 next()
//             })
//         })
//     }
//     else{
//         return next()
//     }
// })

// userSchema.methods.comparePassword = function(passw,cb){
//     bcrypt.compare(passw,this.password,function(err,isMatch){
//         if(err){
//             return cb(err)
//         }
//         cb(null,isMatch)
//     })
// }

module.exports = mongoose.model('bmi',bmiSchema)