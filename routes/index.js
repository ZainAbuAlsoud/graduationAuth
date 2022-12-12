//const { Router } = require('express')
const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hello1')
})

//add new user
router.post('/adduser',actions.addNew)
router.post('/authenticate',actions.authenticate)
router.get('/getinfo',actions.getinfo)
router.post('/getinfo1',actions.getinfo1)
router.post('/addBmi',actions.addNewBMI)
router.post('/update1',actions.update1)
router.post('/update2',actions.update2)
router.post('/addKeto',actions.addNewKETO)
router.get('/getketo',actions.getKeto)
router.post('/addVegetarian',actions.addNewVegetarian)
router.get('/getVegetarian',actions.getVegetarian)
router.post('/addNewPaleo',actions.addNewPaleo)
router.get('/getPaleo',actions.getPaleo)
// router.get('/prof',actions.prof)

module.exports = router