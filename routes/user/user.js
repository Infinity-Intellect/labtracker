const express = require("express");
const router = express.Router();

const User = require('../../models/user');

router.post('/adduser',(req, res)=>{
    User.find({userId:req.body.userId},(err,docs)=>{
        if(!err){
            if(docs.length==0){
                var newUser=new User({
                    userId:req.body.userId,
                    email:req.body.email,
                    role:req.body.role
                })
        
                newUser.save({},(err,docs)=>{
                    if (!err) {
                        res.json({ message: "User Created!" })
                    }
                    else {
                        res.json({ error: err })
                    }
                })
            }
            else{
                res.json({ message: "User Exists!" })
            }
        }
        else {
            res.json({ error: err })
        }
    })
})
module.exports=router;