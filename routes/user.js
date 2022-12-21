const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const saltRounds = 10;

router.post('/register', async (req,res) =>{
console.log('req',req.body);
const {name,email,password} = req.body;
let user = await User.findOne({email})
if(user){
    res.status(400).json({message:"user already exist"})
}

bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log('hashed',hash)
    User.create({
        name,
        email,
        password: hash
    }).then(()=>{
         return res.json({message:"User registered succesfully"})
    })
});
})

router.post('/login',async(req,res)=>{
    const{email,password}= req.body;
    let user =await User.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ userId:user._id }, 'userAuth');
                return res.json({message:"User logged In",token})
            }
            else{
                return res.status(401).json("Invalid password")
            }
        });
    }
    else{
        return res.status(401).json("Invalid email")
    }
})
router.get('/get-info',(req,res)=>{
const header = req.headers;
let token = header.authorization
jwt.verify(token, 'userAuth', async function(err, decoded) {
    if(err){
        res.status(400).json({message:"Auth Failed"})
    }
   let user = await User.findById(decoded.userId,"name email");
//    let user = await User.findById(decoded.userId); for listing with password //
    return res.json({user})

});
})

module.exports = router