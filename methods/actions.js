var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var bmi=require('../models/bmi')
var bcrypt = require ('bcrypt')
var keto=require('../models/keto')

var functions ={
    addNew:function(req,res){
        if((!req.body.email) || (!req.body.password)){
            res.json({success: false , msg:'Enter all fields'})

        }
        else{
            var newUser = User({
                email:req.body.email,
                password: req.body.password
            });
            newUser.save(function(err,newUser){
                if(err){
                    res.json({success: false, msg:'Failed to save'})
                    console.log(err)
                }
                else{
                    res.json({success:true,msg:'Successfully saved'})
                }
            })
        }
    },
    authenticate: function(req,res){
        if((!req.body.email) || (!req.body.password)){
            res.json({success: false , msg:'Enter all fields'})

        }
        else{
        User.findOne({
            email:req.body.email
        },function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({success:false,msg:'Authentication Faild, User not found'})
            }
            else{
                if(user.password==req.body.password){
                    res.json({success:true,msg:'Successfully saved'})
                }
                    
                    else{
                        return res.status(403).send({success:false,msg:'Authentication faild , wrong password'})
                    }
               
                
            }
        })}
    },

    getinfo1: function(req,res){
                User.findOne({
            email:req.body.email
        },function(err,user){
            if(err) throw err
            if(!user){//not exist
                res.status(403).send({success:true,msg:'User not found'})
            }
            else{//if exist
                res.status(403).send({success:false,msg:'User already exist'})
                    
                
            }
        })
    },

    addNewBMI:function(req,res){
        if((!req.body.email) || (!req.body.weight) || (!req.body.age) || (!req.body.height) || (!req.body.name)){
            res.json({success: false , msg:'Enter all fields'})

        }
        else{
            var newBmi = bmi({
                email:req.body.email,
                weight: req.body.weight,
                age:req.body.age,
                height: req.body.height,
                name:req.body.name,
            });
            newBmi.save(function(err,newBmi){
                if(err){
                    res.json({success: false, msg:'Failed to save'})
                    console.log(err)
                }
                else{
                    res.json({success:true,msg:'Successfully saved'})
                }
            })
        }
    },
    getinfo: function(req,res){
        if(req.headers.email && req.headers.email.split(' ')[0]==='Bearer'){
            var token = req.headers.email.split(' ')[1]
            // var decodedtoken = jwt.decode(token,config.secret)
            bmi.findOne({
                email:token
            },function(err,user){
                if(err) throw err
                if(!user){
                    return res.json({success:false,msg:'Hello '+token})
                }
                else{
                                               
                    return res.json({success:true,msg:user.name+'-'+user.email+'-'+user.weight+'-'+user.height+'-'+user.age})
                    
                    
                }
            })
            
        }
        else{
            return res.json({success:false,msg:'No Headers'})
        }
    },
    update1: function(req,res){
        bmi.findOneAndUpdate({ email: req.body.email }, {
            weight: req.body.weight,
            height:req.body.height,
            name:req.body.name,
            age:req.body.age
           }, { runValidators: true }, function (err) {
            if (err) {
             err.type = 'database';
             res.json({success: false, msg:err})
            }
            res.json({success: true, msg:'update done'})
          
           
           });
},
update2: function(req,res){

    User.findOneAndUpdate({ email: req.body.email }, {
        
       password: req.body.password,
        
       }, { runValidators: true },
        
    
       function (err) {
        if (err) {
         err.type = 'database';
         res.json({success: false, msg:err})
        }
        res.json({success: true, msg:'update done'})
      
       
       }
       )
      
       ;
},


addNewKETO:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newKETO = keto({
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newKETO.save(function(err,newKETO){
            if(err){
                res.json({success: false, msg:'Failed to save'})
                console.log(err)
            }
            else{
                res.json({success:true,msg:'Successfully saved'})
            }
        })
    }
},


    getKetoNUM: function(req,res){
        
                keto.countDocuments().then((count_documents) => {
                    res.json({success:true,msg:count_documents})
                  });
    },
    getKeto: function(req,res){
        
                keto.find({}).lean().exec(function(err, result) {
                    if (err) res.json({success: false, msg:err});
                    res.json({success:true,msg:result})
                    
                  });
    },
}

module.exports = functions