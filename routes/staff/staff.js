const express = require("express");
const router = express.Router();

const Staff = require('../../models/staff');
const Lab = require('../../models/lab');


router.post('/update',(req, res)=>{
    Staff.find({userId:req.body.userId},(err,docs)=>{
        if(!err){
            var newStaff=new Staff({
                userId:req.body.userId,
                staffId:req.body.staffId,
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
router.get('/viewAllLabs',async (req,res)=>{
    await Lab.find({staff_ids:{$all:[req.query.staffId]}},async (err,docs)=>{
        if(docs.length>0){
            res.json(docs);
        }
        else{
            res.json({ message: "Lab Not Found!" })
        }
    })       
  })
  router.get('/allStaffs',async (req,res)=>{
    await Staff.find({},async (err,docs)=>{
      if(docs.length>0){
        res.json(docs);
      }else if(err){
        console.log(err);
      }
      else{
        res.json({ message: "No staffs Found!"});
      }
  
    })
  })
module.exports=router;