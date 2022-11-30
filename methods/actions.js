var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var bmi=require('../models/bmi')

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
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch && !err){
                        var token= jwt.encode(user,config.secret)
                        res.json({success:true,token:token})
                    }
                    else{
                        return res.status(403).send({success:false,msg:'Authentication faild , wrong password'})
                    }
                })
            }
        })}
    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token,config.secret)
            return res.json({success:true,msg:'Hello '+decodedtoken.email})
        }
        else{
            return res.json({success:false,msg:'No Headers'})
        }
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
    prof: function(req,res) {
        bmi.findOne({email:req.body.email}, function(err, result) {
            if (err) throw err;
            // console.log(result.name);

            else{
                res.json({success:true,msg:result.name+'-'+result.email+'-'+result.weight+'-'+result.height})
            }
            // db.close();
          });
        // const findResult =  bmi.find({
        //     email: req.body.email,
            
        //   });
        
            // const userOrders =  bmi.find({"email" : req.body.email})
            
        
            // if (!userOrders) {
            //   return res.status(403).send({ message: "User not found" })
            // }
        
            
            // res.status(403).send({ message: findResult{''}})
        
          
          
        // bmi.findOne({
        //     email:req.body.email
        // },function(err,bmi){
        //     if(err) throw err
        //     if(!mbi){//not exist
        //         res.status(403).send({success:true,msg:'User not found'})
        //     }
        //     else{//if exist
        //        // res.status(403).send({success:false,msg:'User already exist'})
        //             res.status(403).send({success:true,msg:})
                
        //     }
        // })

       
    }
    

}

module.exports = functions