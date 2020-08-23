const { exec } = require('child_process')
const path = require('path')

const compileC_FamilyProgram1 = (filepath, accept, reject) => {
    const executableObject = path.parse(filepath).name
    const extension = path.parse(filepath).ext
    const command = extension === '.c' ? 'cc' : 'c++'
    exec(`${command} ${filepath} -o ./sampleprogram/${executableObject}`, (err, stdout, stderr) => {
        if (stderr) {
            return reject(stderr)
        }
        else {
            return accept(executableObject)
        }
    })
}
const runC_FamilyProgram = (executableObject, inputCasesFilePath, accept, reject) => {
    exec(`./sampleprogram/${executableObject}<${inputCasesFilePath} 1>./sampleprogram/${executableObject}.txt`, (err, stdout, stderr) => {
        if (stderr) {
            return reject(stderr)
        }
        return accept(`./sampleprogram/${executableObject}.txt`)
    })
}

const main = async (filepath, inputCasesFilePath) => {
    return new Promise((resolve, reject) => {
        compileC_FamilyProgram1(filepath,
            (executableObject) => {
                if (executableObject) {
                    runC_FamilyProgram(executableObject, inputCasesFilePath,
                        (outputFilePath) => {
                            resolve(outputFilePath)
                        },
                        (errorResult) => {
                            reject(errorResult)
                        })
                }
            },
            (errorResult) => {
                reject(errorResult)
            }
        )

    })
}

// const filepath = process.argv[2]
// const inputCasesFilePath = process.argv[3]
// const outputCasesFilePath = process.argv[4]

const verifyCProgram = (filepath, inputCasesFilePath, outputCasesFilePath) => {
    return new Promise((resolve, reject) => {
        main(filepath, inputCasesFilePath).then(userProgramOutputFilePath => {
            exec(`diff ${outputCasesFilePath} ${userProgramOutputFilePath} -s`, (err, stderr, stdout) => {
                if (stderr) {
                    if (stderr.indexOf("identical") === -1)
                        reject(stderr)
                    else
                        resolve("All cases passed!")
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
}


// verifyCProgram(filepath, inputCasesFilePath, outputCasesFilePath).then(res => { console.log(res) }).catch(err => {
//     console.log(err)
// })

module.exports = verifyCProgram