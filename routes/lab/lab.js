const express = require("express");
const router = express.Router();

const Lab = require('../../models/lab');
const LabProgression = require('../../models/lab_progression');
const Staff = require('../../models/staff');
const Student = require("../../models/student");
const Exercise = require("../../models/exercise");
const ExerciseProg=require("../../models/exer_progression")
const User = require("../../models/user");
const Comment= require('../../models/comment');
const Reply=require('../../models/reply');
const Discussion= require('../../models/discussion');


router.post('/addlab',async (req,res)=>{
    var d = new Date();
    var n = d.getFullYear();
    Lab.find({lab_code:req.body.lab_code,year:n},async (err,docs)=>{
        if(!err){
            if(docs.length==0){
                var newLab=new Lab({
                    student_ids:req.body.student_ids,
                    exer_ids:[],
                    staff_ids:req.body.staff_ids,
                    lab_name:req.body.lab_name,
                    year:n,
                    lab_code:req.body.lab_code  
                }) 
                newLab.labId=newLab._id;
                console.log(newLab._id)
                  await newLab.save({},async (err, docs) => {
                    if (!err) {
                        for (i=0;i<req.body.student_ids.length;i++){
                            var newLabProg=new LabProgression({
                                labId:newLab._id,
                                exer_prog_ids:[]
                            })
                            newLabProg.labProgId=newLabProg._id;
                            await newLabProg.save({},()=>{});
                            await Student.updateOne({studentId:req.body.student_ids[i]},{$addToSet:{lab_prog_ids:newLabProg._id}})
                        }
                        await Staff.updateMany({staffId:{$in:req.body.staff_ids}},{$addToSet:{lab_ids:newLab._id}})

                        res.json({ message: "Information Updated!" })
                    }
                    else {
                        res.json({ error: err })
                    }
                }) 
            }
            else{
                res.json({ message: "Lab Already Exists!" }) 
            }      
        }
        else{
            res.json({ error: err })
        }
    })
})
router.post('/deletelab',async (req,res)=>{
    await Lab.find({labId:req.body.labId},async (err,docs)=>{
        if(docs.length>0){
            await Staff.find({staffId:req.body.staffId,lab_ids:{$elemMatch:{$eq:req.body.labId}}},async (err,doc)=>{
                 if(doc.length>0){
                     await Student.find({studentId:{$in:docs[0].student_ids}},async (err,docs1)=>{     
                        await LabProgression.find({labId:req.body.labId},async (err,docs2)=>{
                            for(j=0;j<docs2.length;j++){
                                await Student.updateMany({studentId:{$in:docs[0].student_ids}},{$pull:{lab_prog_ids:docs2[j].labProgId}})
                                if(docs2[j].exer_prog_ids.length>0){
                                    await ExerciseProg.deleteMany({exerProgId:{$in:docs2[j].exer_prog_ids}})
                                }
                            }
                            await Exercise.find({exerId:{$in:docs[0].exer_ids}}, async (err,doc)=>{
                                if(doc!=null && doc.length>0){
                                    console.log(doc)
                                    for(i=0;i<doc.length;i++){
                                            await Discussion.find({discussionId:doc[i].discussionId},async (err,docs3)=>{
                                                if(docs3!=null){
                                                    await Comment.find({commentId:{$in:docs3.comment_ids}},async (err,docs4)=>{
                                                        if(docs4!=null){
                                                            for(j=0;j<docs4.length;j++){
                                                                if(docs4[j].reply_ids.length>0){
                                                                    await Reply.deleteMany({replyId:{$in:docs4[j].reply_ids}})
                                                                }
                                                            }
                                                            await Comment.deleteMany({commentId:{$in:docs3.comment_ids}},async (err)=>{})
                                                        }
                                                    })
                                                }
                                            })
                                            await Exercise.deleteOne({exerId:doc[i].exerId},async (err)=>{})
                                            await Discussion.deleteOne({discussionId:doc[i].discussionId},async (err)=>{})
                                    }
                                  
                                }
                            })
                        })
                        await Staff.updateMany({staffId:{$in:docs[0].staff_ids}},{$pull:{lab_ids:req.body.labId}})
                        await LabProgression.deleteMany({labId:req.body.labId})
                        await Lab.deleteOne({labId:req.body.labId});
                    })
                    
                    res.json({ message: "Lab Deleted!" })
                }
                else{
                    res.json({ message: "You Can't Delete This Lab" });
                 }
            })
        }
        else{
            res.json({ message: "Lab Not Found!" })
        }
    
    })
})
router.post('/viewlab',async (req,res)=>{
    var userIds=[]
    await Lab.find({labId:req.body.labId},async (err,docs)=>{
        if(docs.length>0){
            await Staff.find({staffId:{$in:docs[0].staff_ids}},{__v: false, _id: false,staffId:false,lab_ids:false},async (err,doc)=>{
                for(i=0;i<doc.length;i++){
                    await userIds.push(doc[i].userId);
                }
                console.log(userIds)
                await User.find({userId:{$in:userIds}},{name:true},async (err,doc2)=>{                
                        await Exercise.find({labId:req.body.labId},{exer_title:true,exer_no:true,exerId:true},async (err,doc1)=>{
                            res.json({ staff_ids:docs[0].staff_ids,staff_names:doc2,student_ids:docs[0].student_ids,lab_code:docs[0].lab_code,year:docs[0].year,lab_name:docs[0].lab_name,exercises:doc1});
                     })
                })
            })
        }
        else{
            res.json({ message: "Lab Not Found!" })
        }
    })
})

router.post('/updatelab',async (req,res)=>{
    var d = new Date();
    var n = d.getFullYear();
    await Lab.updateOne({labId:req.body.labId},{$set:{lab_name:req.body.lab_name,lab_code:req.body.lab_code},$addToSet:{student_ids:req.body.student_ids,staff_ids:req.body.staff_ids}},async (err,doc)=>{
        if(req.body.staff_ids.length>0 && req.body.staff_ids!=undefined){
            await Staff.updateMany({staffId:{$in:req.body.staff_ids}},{$addToSet:{lab_ids:req.body.labId}},async (err,doc)=>{})
        }
        if(req.body.student_ids.length>0 && req.body.student_ids!=undefined){
            console.log(req.body.student_ids)
                for(i=0;i<req.body.student_ids.length;i++){
                        var newLabProg=new LabProgression({
                          labId:req.body.labId,
                          exer_prog_ids:[]
                        })
                        newLabProg.labProgId=newLabProg._id;
                        await newLabProg.save()
                        await Student.updateOne({studentId:req.body.student_ids[i]},{$addToSet:{lab_prog_ids:newLabProg._id}})
                }
            }
        await res.json({ message: "Lab Updated!" }) 
    })
})

router.get('/viewAllLabs',async (req,res)=>{
    await Lab.find({}).populate('exer_ids').exec(async (err,docs)=>{
        if(docs.length>0){
            res.json(docs);
        }
        else{
            res.json({ message: "Lab Not Found!" })
        }
    })
})
module.exports=router;