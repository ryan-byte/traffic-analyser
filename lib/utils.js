

module.exports = {readJsonFile}

async function readJsonFile(filePath){
    new Promise((resolve,reject)=>{
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                reject(err);
            }
          
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData)
            } catch (jsonError) {
                console.error('Error parsing JSON data:', jsonError);
                reject(jsonError)
            }
        });
    })
}