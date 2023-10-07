const fs = require("fs");



module.exports = {readFile}

async function readFile(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                reject(err);
            }
          
            try {
                resolve(data);
            } catch (Error) {
                reject(Error)
            }
        });
    })
}