var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var bmi=require('../models/bmi')
var bcrypt = require ('bcrypt')
var keto=require('../models/keto')
var vegetarian=require('../models/vegetarian')
var paleo=require('../models/paleo')
var raw=require('../models/raw')
var carb=require('../models/lowcarb')
var sugar=require('../models/sugar')
var diet=require('../models/flags')
var food=require('../models/food')
var over=require('../models/over')
var under=require('../models/under')
var normal=require('../models/normal')

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


    // getKetoNUM: function(req,res){
        
    //             keto.countDocuments().then((count_documents) => {
    //                 res.json({success:true,msg:count_documents})
    //               });
    // },
    
    getKeto: function(req,res){
        
                keto.find({}).lean().exec(function(err, result) {
                    if (err) res.json({success: false, msg:err});
                    res.json({success:true,msg:result})
                    
                  });
    },


    addNewVegetarian:function(req,res){
        if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
            res.json({success: false , msg:'Enter all fields'})
    
        }
        else{
            var newVegetarian = vegetarian({
                name:req.body.name,
                weight: req.body.weight,
                fats:req.body.fats,
                protein: req.body.protein,
                calories:req.body.calories,
            });
            newVegetarian.save(function(err,newVegetarian){
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

    getVegetarian: function(req,res){
        
        vegetarian.find({}).lean().exec(function(err, result) {
            if (err) res.json({success: false, msg:err});
            res.json({success:true,msg:result})
            
          });
},

addNewPaleo:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newPaleo = paleo({
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newPaleo.save(function(err,newPaleo){
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

getPaleo: function(req,res){
        
    paleo.find({}).lean().exec(function(err, result) {
        if (err) res.json({success: false, msg:err});
        res.json({success:true,msg:result})
        
      });
},

addNewRaw:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newRaw = raw({
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newRaw.save(function(err,newRaw){
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

getRaw: function(req,res){
        
    raw.find({}).lean().exec(function(err, result) {
        if (err) res.json({success: false, msg:err});
        res.json({success:true,msg:result})
        
      });
},

addNewCarb:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newCarb = carb({
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newCarb.save(function(err,newRaw){
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

getCarb: function(req,res){
        
    carb.find({}).lean().exec(function(err, result) {
        if (err) res.json({success: false, msg:err});
        res.json({success:true,msg:result})
        
      });
},

addNewSugar:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newSugar = sugar({
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newSugar.save(function(err,newRaw){
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

getSugar: function(req,res){
        
    sugar.find({}).lean().exec(function(err, result) {
        if (err) res.json({success: false, msg:err});
        res.json({success:true,msg:result})
        
      });
},
addDiet:function(req,res){
    if((!req.body.email)||(!req.body.keto) || (!req.body.paleo) || (!req.body.vegetarian) || (!req.body.raw) || (!req.body.carb) || (!req.body.sugar) || (!req.body.num)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newDiet = diet({
            email:req.body.email,
            keto:req.body.keto,
            paleo: req.body.paleo,
            vegetarian:req.body.vegetarian,
            raw: req.body.raw,
            carb:req.body.carb,
            sugar:req.body.sugar,
            num:req.body.num
        });
        newDiet.save(function(err,newDiet){
            if(err){
                res.json({success: false, msg:'Failed to save'})
                
            }
            else{
                res.json({success:true,msg:'Successfully saved'})
            }
        })
    }
},

checkDiet: function(req,res){
    diet.findOne({
email:req.body.email
},function(err,diet){
if(err) throw err
if(!diet){//not exist
    res.json({success: false, msg:'User not found'})
    // console.log('User not found')
}
else{//if exist
    res.json({success: false, msg:'User already exist'})
    console.log('User found')
        
    
}
})
},

// checkDiet:function(req,res){
//     diet.findOne({
//         email:req.body.email
//     },function(err,diet){
//         if(err) throw err
//         if(!diet){
//                res.status(403).send({success:false,msg:'User not found'})
//             //  console.log(email)
//          }else{
            
//           res.status(403).send({success:true,msg:'User found'})
//           console.log("found")
//            }
//     })
// },

getDiet: function(req,res){
    diet.findOne({
    email:req.headers.email
},function(err,diet){
if(err) throw err
if(!diet){
    res.status(403).send({success:true,msg:'User not found'})
}
else{
   if(diet.keto==false && diet.paleo==false && diet.vegetarian==false && diet.raw==false && diet.carb==false && diet.sugar==false){
     
     res.json({success:true,msg:'1'})
   }

   else if(diet.keto==true){
    res.json({success:true,msg:'2'})
   }
        
    else if(diet.paleo==true){
    res.json({success:true,msg:'3'})}
 
    else if(diet.vegetarian==true){
    res.json({success:true,msg:'4'})}

    else if(diet.raw==true){
    res.json({success:true,msg:'5'})}

    else if(diet.carb==true){
    res.json({success:true,msg:'6'})}

    else if(diet.sugar==true){
    res.json({success:true,msg:'7'})}

    else{
    res.json({success:true,msg:'8'})}
}
})
},
updateDiet:function(req,res){

    diet.findOneAndUpdate({ email: req.body.email }, {
        
        keto:req.body.keto,
        paleo: req.body.paleo,
        vegetarian:req.body.vegetarian,
        raw: req.body.raw,
        carb:req.body.carb,
        sugar:req.body.sugar,
        
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

addNewFood:function(req,res){
    if((!req.body.name) || (!req.body.weight) || (!req.body.fats) || (!req.body.protein) || (!req.body.calories) || (!req.body.email)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newFood = food({
            email:req.body.email,
            name:req.body.name,
            weight: req.body.weight,
            fats:req.body.fats,
            protein: req.body.protein,
            calories:req.body.calories,
        });
        newFood.save(function(err,newFood){
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

getCalories: function(req,res){
        var c=0;
        food.countDocuments().then((count_documents) => {

            food.find({},{"calories": 1,"email": 2}).lean().exec(function(err, result) {
                if (err) res.json({success: false, msg:err});
                for (let i = 0; i <count_documents; i++){
                   if(result[i].email==req.headers.email)
                     c=c+parseFloat(result[i].calories);
                    
                }
                res.json({success:true,msg: c.toFixed(2)})
              });
        });
     
  
},

getFats: function(req,res){
    var c=0;
    food.countDocuments().then((count_documents) => {
        food.find({},{"fats": 1,"email": 2}).lean().exec(function(err, result) {
            if (err) res.json({success: false, msg:err});
            for (let i = 0; i <count_documents; i++){
                if(result[i].email==req.headers.email)
                 c=c+parseFloat(result[i].fats);
            }
            res.json({success:true,msg: c.toFixed(2)})
          });
    });
 

},

getProtein: function(req,res){
    var c=0;
    food.countDocuments().then((count_documents) => {
        food.find({},{"protein": 1,"email": 2}).lean().exec(function(err, result) {
            if (err) res.json({success: false, msg:err});
            for (let i = 0; i <count_documents; i++){
                if(result[i].email==req.headers.email)
                 c=c+parseFloat(result[i].protein);
            }
            res.json({success:true,msg: c.toFixed(2)})
          });
    });
 

},
addNewOver:function(req,res){
    if((!req.body.name) || (!req.body.desc) || (!req.body.video)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newOver = over({
            name:req.body.name,
            desc: req.body.desc,
            video:req.body.video,
        });
        newOver.save(function(err,newOver){
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

addNewUnder:function(req,res){
    if((!req.body.name) || (!req.body.desc) || (!req.body.video)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newUnder = under({
            name:req.body.name,
            desc: req.body.desc,
            video:req.body.video,
        });
        newUnder.save(function(err,newUnder){
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

addNewNormal:function(req,res){
    if((!req.body.name) || (!req.body.desc) || (!req.body.video)){
        res.json({success: false , msg:'Enter all fields'})

    }
    else{
        var newNormal =normal({
            name:req.body.name,
            desc: req.body.desc,
            video:req.body.video,
        });
        newNormal.save(function(err,newNormal){
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

getNormal: function(req,res){
        
    normal.find({}).lean().exec(function(err, result) {
        if (err) res.json({success: false, msg:err});
        res.json({success:true,msg:result})
        
      });
},
}

module.exports = functions