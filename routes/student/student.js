const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var bodyParser = require("body-parser");
express().use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");

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
        console.log(err);
      });
    res.end("File is uploaded");
  });
});

module.exports = router;
