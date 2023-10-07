const fs = require("fs");


module.exports = {readFile, wait, getRandomNum}

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


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
}