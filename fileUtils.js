import fs from "fs"

const JSON_FILE="books.json";
export function readJson (jsonPath){
    try {
        const jsonData= fs.readFileSync (jsonPath)
        const data= JSON.parse(jsonData);
        return data 
    }
    catch (error) {
        console.log(error);
        
    }
}

export function updateJson (newData,jsonPath){
    try {
        const jsonData= fs.readFileSync (jsonPath)
        const data =JSON.stringify(newData)
        const newJson=fs.writeFileSync(jsonPath,data)
        return newJson
    }
    catch (error) {
        console.log(error);
        
    }
}
//updateJson([],"books-test.json")
//console.log(readJson("books.json"))
