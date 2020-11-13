const express = require("express");
const router = express.Router();

const Lab = require('../../models/lab');
const LabProgression = require('../../models/lab_progression');
const Discussion= require('../../models/discussion');
const Exercise = require("../../models/exercise");
const ExerciseProg=require("../../models/exer_progression")
const Comment= require('../../models/comment');
const Reply=require('../../models/reply');

router.post('/addexer',async (req,res)=>{
  var today =await new Date();
  var deadline=await new Date();
  deadline=deadline.setDate(deadline.getDate() + Number(req.body.timelimit))
  deadline=await new Date(deadline);
   await Exercise.find({$or:[{title:req.body.title},{$and:[{labId:req.body.labId},{exer_no:req.body.exer_no}]}]},async (err,docs)=>{
        if(docs.length==0){
            var newDiscussion= new Discussion()
            newDiscussion.discussionId=newDiscussion._id;
            var newExer= new Exercise({
                title:req.body.title,
                prob_stmt:req.body.prob_stmt,
                exer_no:req.body.exer_no,
                date_of_creation:today,
                deadline:deadline,
                labId:req.body.labId
            })
            newExer.exerId=newExer._id;
            newExer.discussionId=newDiscussion._id;
            await newExer.save({},async (err,docs)=>{
                if(err){
                    console.log(err)
                }
                else{
                    await newDiscussion.save({},async (err,docs)=>{
                        await Lab.updateOne({labId:req.body.labId},{$addToSet:{exer_ids:newExer._id}},async (err,docs)=>{
                            res.json({ message: "Information Updated!" })
                        })
                    })
                }
            })
        }
        else{
            res.json({ message: "Exercise Exists!" })
        }
    })
})
router.post('/updateexer',async (req,res)=>{
  var deadline=await new Date();
  deadline=deadline.setDate(deadline.getDate() + Number(req.body.timelimit))
  deadline=await new Date(deadline);
   await Lab.find({labId:req.body.labId},async (err,docs1)=>{
    if(docs1.length>0){
        await console.log("1");
        await Exercise.find({exerId:req.body.exerId},async (err,docs)=>{
        if(docs.length>0){
            if(req.body.labId!=docs[0].labId){
                await console.log("2");
                await Lab.updateOne({labId:docs[0].labId},{$pull:{exer_ids:req.body.exerId}},async (err,docs)=>{
                    await Lab.updateOne({labId:req.body.labId},{$addToSet:{exer_ids:req.body.exerId}},async (err,docs)=>{})
                })  
            }
            await Exercise.updateOne({exerId:req.body.exerId},{$set:{title:req.body.title,exer_no:req.body.exer_no,prob_stmt:req.body.prob_stmt,deadline:deadline}},async (err)=>{
                res.json({ message: "Information Updated!" })                    
            })
        }
        
        else{
            res.json({ message: "Exercise Not Found!" })
        }
    })
    }
    else{
        res.json({ message: "Lab Not Found!" })
    }
   })
})
router.post('/deleteexer',async (req,res)=>{
    await Exercise.find({exerId:req.body.exerId},async (err,docs)=>{
        if(docs.length>0){
                await ExerciseProg.find({exerId:req.body.exerId},async (err,docs2)=>{
                    if(docs2!=null && docs2.length>0){
                        for(i=0;i<docs2.length;i++){
                            await LabProgression.updateMany({labId:docs[0].labId},{$pull:{exer_prog_ids:docs2[i].exerProgId}},async (err)=>{
                                await ExerciseProg.deleteOne({exerProgId:docs2[i].exerProgId})
                            })
                        }
                        await Exercise.deleteOne({exerId:req.body.exerId},async (err)=>{
                            await Discussion.find({discussionId:docs[0].discussionId},async (err,docs3)=>{
                                if(docs[0].comment_ids.length>0){
                                    await Comment.find({commentId:{$in:docs[0].comment_ids}},async (err,docs4)=>{
                                        if(doc4!=null && docs4.length>0){
                                            for(i=0;i<docs4.length;i++){
                                                if(docs4[i].reply_ids.length>0){
                                                    await Reply.deleteMany({replyId:{$in:docs4[i].reply_ids}})
                                                }
                                            }
                                            await Comment.deleteMany({commentId:{$in:docs[0].comment_ids}},async (err)=>{})
                                        }
                                    })
                                }
                            })
                        })
                    }
                    console.log(docs)
                    await Lab.updateOne({labId:docs[0].labId},{$pull:{exer_ids:docs[0].exerId}},async (err)=>{
                        await Exercise.deleteOne({exerId:req.body.exerId},async (err)=>{
                            await Discussion.deleteOne({discussionId:docs[0].discussionId},async (err)=>{
                                res.json({ message: "Exercise Deleted!" })
                            })
                        })
                    })
                    
                })
        }
        else{
            res.json({ message: "Exercise Not Found!" })
        }
    })
})

router.post('/viewexer',async (req,res)=>{
    await Exercise.find({exerId:req.body.exerId},async (err,docs)=>{
        if(docs.length>0){
            res.json({title:docs[0].title,prob_stmt:docs[0].prob_stmt,exer_no:docs[0].exer_no,date_of_creation:docs[0].date_of_creation,deadline:docs[0].deadline})
        }
        else{
            res.json({ message: "Exercise Not Found" })
        }
    })
})

module.exports=router;