const express = require("express")
const router = express.Router()

//Import Program verifier functions
const verifyCProgram = require('../../program_verifier/C_Cpp_ProgramVerifier')

//To call route : http://localhost:3001/verifyProgram?file=prog.c&input=input.txt&output=output.txt
router.get("/verifyProgram", async (req, res) => {
    const filepath = `./sampleprogram/${req.query.file}`
    const inputfilepath = `./sampleprogram/${req.query.input}`
    const outputfilepath = `./sampleprogram/${req.query.output}`
    verifyCProgram(filepath, inputfilepath, outputfilepath).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router