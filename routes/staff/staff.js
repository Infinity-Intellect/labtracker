const express = require("express");
const router = express.Router();

const Staff = require('../../models/staff');

router.post('/update',(req, res)=>{
    Staff.find({userId:req.body.userId},(err,docs)=>{
        if(!err){
            var newStaff=new Staff({
                userId:req.body.userId,
                staffId:req.body.staffId,
                name:req.body.name,
                lab_ids:[]  
              }) 
            if(docs.length==0){
                  newStaff.save({}, (err, docs) => {
                    if (!err) {
                        res.json({ message: "Information Updated!" })
                    }
                    else {
                        res.json({ error: err })
                    }
                }) 
            }
            else{
                Staff.updateOne({userId:req.body.userId},{$set:{userId:req.body.userId,
                    staffId:req.body.staffId,
                    name:req.body.name,
                    }
                },(err, result) => {
                    if (!err) {
                        res.json({ message: "Information Updated!" })
                    }
                    else{
                        res.json({ error: err })
                    }
                    
                })
                
                
            }      
        }
        else{
            res.json({ error: err })
        }
    })
})
module.exports=router;