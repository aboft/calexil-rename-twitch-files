const fs = require('fs')
const path = require('path')
const file = process.argv[2]

const renameFile = async (file) => {
    const files = fs.readdirSync(process.cwd())
    file = file.trim()
    const jsonFile = require(path.resolve(file))
    let changeNames = {}
    let id = 0;
    jsonFile.forEach(d => {
        const oldFileName = d.download_url.split('tv/')[1].replace(/%7C/, '_')
        console.log(oldFileName)
        const newFileName = d.title.replace(/[^a-zA-Z0-9_]/g,'-').trim()
        changeNames[id] = {oldName: oldFileName, newName: `${newFileName}`}
        id++
    })
    // console.log(changeNames)
    for (let name in changeNames) {
        if (fs.existsSync(changeNames[name].oldName)){
            fs.renameSync(path.resolve(path.join(process.cwd(), changeNames[name].oldName)), path.resolve(path.join(process.cwd(), `${changeNames[name].newName}${name}`)))
        }
    }    
}

renameFile(file)

