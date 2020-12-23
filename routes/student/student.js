const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var bodyParser = require("body-parser");
express().use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");
const Student = require('../../models/student');
const LabProg = require('../../models/lab_progression');
const Lab = require('../../models/lab');



//Import Program verifier functions
const verifyCProgram = require("../../program_verifier/C_Cpp_ProgramVerifier");
var storage1 = multer.diskStorage({
  destination: "./sampleprogram/programs",
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
  function(req, res) {
    res.status(204).end();
  },
});
function checkFileType(file, cb) {
  const filetypes = /c/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:only C or txt files");
  }
}
const upload = multer({
  storage: storage1,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");
//To call route : http://localhost:3001/verifyProgram?file=prog.c&input=input.txt&output=output.txt
router.post("/verifyProgram", async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    const filepath = `./sampleprogram/programs/${req.file.filename}`;
    const inputfilepath = `./sampleprogram/input.txt`;
    const outputfilepath = `./sampleprogram/output.txt`;
    verifyCProgram(filepath, inputfilepath, outputfilepath)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err)
      });
  });
});
router.post('/update',(req, res)=>{
  Student.find({userId:req.body.userId},(err,docs)=>{
      if(!err){
          var newStudent=new Student({
              userId:req.body.userId,
              studentId:req.body.studentId,
              sem:req.body.sem,
              lab_prog_ids:[]  
            }) 
          if(docs.length==0){
                newStudent.save({}, (err, docs) => {
                  if (!err) {
                      res.json({ message: "Information Updated!" })
                  }
                  else {
                      res.json({ error: err })
                  }
              }) 
          }
          else{
              Student.updateOne({userId:req.body.userId},{$set:{userId:req.body.userId,
                  studentId:req.body.studentId,
                  sem:req.body.sem}
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
router.post('/viewStudent',async (req,res)=>{
  list=[];
  console.log("new")

  await Student.find({userId:req.body.userId},async (err,docs)=>{
    if(docs.length>0){
      console.log("new")
      for(i=0;i<docs.length;i++){
          await LabProg.find({labProgId:{$in:docs[i].lab_prog_ids}},async (err,docs1)=>{
            console.log(docs1)
            for(j=0;j<docs1.length;j++){
              await list.push(docs1[j].labId);
            }
            console.log(list)
            await Lab.find({labId:{$in:list}},async (err,docs2)=>{
              res.json({message:docs2});
            })
          })
      }
    }
    else{
      res.json({message:"Student Not Found"})
    }
  })
})
module.exports = router;
